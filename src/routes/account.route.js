const express = require('express');
const { decodeFirebaseToken } = require('../middleware/accountMiddleware');
const { addNewUser, deleteUser } = require('../controller/account.controller');

const accountRouter = express.Router();

accountRouter.use('/', decodeFirebaseToken);
accountRouter.post('/login-signup', addNewUser);
accountRouter.post('/delete', deleteUser);

module.exports = accountRouter;
