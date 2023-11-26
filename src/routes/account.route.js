const express = require('express');
const { decodeFirebaseToken } = require('../middleware/accountMiddleware');
const { addNewUser, logoutUser } = require('../controller/account.controller');

const accountRouter = express.Router();

accountRouter.use('/', decodeFirebaseToken);
accountRouter.post('/loginSignup', addNewUser);
accountRouter.post('/logout', logoutUser);

module.exports = accountRouter;
