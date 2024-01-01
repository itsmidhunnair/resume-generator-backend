const { SUBDOMAIN_MISSING } = require('../constant/errorCodes');
const { addUserToDb, getAllData } = require('../services/cardData.services');

const addNewUser = async (req, res) => {
  const { name, email, token, tokenExp, picture } = req.userData;
  try {
    await addUserToDb({ name, email, picture });
    // res.cookie('token', token, {
    //   httpOnly: true,
    //   sameSite: 'none',
    //   secure: true,
    //   maxAge: tokenExp,
    // });
    return res.status(201).json({
      success: true,
      data: { msg: 'User Created Successfully', newUser: true },
    });
  } catch (error) {
    if (error.code === 11000) {
      const data = await getAllData({ email });
      if (!data.subDomain) {
        return res.status(417).json({
          success: false,
          data: {
            msg: 'Please add subdomain.',
            code: SUBDOMAIN_MISSING,
            newUser: true,
          },
        });
      }
      return res.status(200).json({
        success: true,
        data: { msg: 'User already Present', newUser: false },
      });
    }
    res.status(500).json({ success: false, data: error });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  });
  res
    .status(200)
    .json({ success: true, data: { msg: 'User Logged out successfully' } });
};

module.exports = { addNewUser, logoutUser };
