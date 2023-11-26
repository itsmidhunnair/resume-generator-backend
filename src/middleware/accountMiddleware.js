const { verifyToken } = require('../services/auth.services');

const decodeFirebaseToken = async (req, res, next) => {
  let token = req.headers?.token;

  if (!token) {
    token = req.body.accessToken;
  }

  try {
    const {
      name, picture, email, exp,
    } = await verifyToken(token);
    console.log('line 17');
    req.userData = {
      name,
      picture,
      email,
      token: req.body.accessToken.split(' ')[1],
      tokenExp: exp,
    };
    console.log(
      '🚀 ~ file: accountMiddleware.js:11 ~ decodeFirebaseToken ~ req.userData:',
      req.userData,
    );
    next();
  } catch (error) {
    console.log(
      '🚀 ~ file: accountMiddleware.js:31 ~ decodeFirebaseToken ~ error:',
      error,
    );
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    res.status(400).json({ success: false, data: error });
  }
};

module.exports = { decodeFirebaseToken };
