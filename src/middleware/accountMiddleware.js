const { verifyToken } = require('../services/auth.services');

const decodeFirebaseToken = async (req, res, next) => {
  if (req.headers.token) {
    const token = req.headers?.token;
    try {
      const { name, picture, email, exp } = await verifyToken(token);
      req.userData = {
        name,
        picture,
        email,
        token,
        tokenExp: exp,
      };

      req.uid = email;
      req.editor = true;
      return next();
    } catch (error) {
      // res.clearCookie('token', {
      //   httpOnly: true,
      //   sameSite: 'none',
      //   secure: true,
      // });
      return res.status(400).json({ success: false, data: error });
    }
  }
  req.uid = req.headers.subdomain;
  req.editor = false;
  return next();
};

module.exports = { decodeFirebaseToken };
