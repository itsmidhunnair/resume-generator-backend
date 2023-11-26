const { addUserToDb } = require('../services/resumeData.services');

const addNewUser = async (req, res) => {
  const { name, email, token, tokenExp } = req.userData;
  try {
    const data = await addUserToDb({ name, email });
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: tokenExp,
    });
    return res
      .status(201)
      .json({ success: true, data: { msg: 'User Created Successfully' } });
  } catch (error) {
    if (error.code === 11000) {
      res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        maxAge: tokenExp,
      });
      return res
        .status(200)
        .json({ success: true, data: { msg: 'User already Present' } });
    }
    console.log('THis exe');
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
