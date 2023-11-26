const express = require('express');
// const { addNewUserInDb } = require('../middleware/accountMiddleware');
const { getUserData, addData } = require('../controller/resume.controller');
const { decodeFirebaseToken } = require('../middleware/accountMiddleware');

const resumeRouter = express.Router();

resumeRouter.get('/getData/:uid', getUserData);
resumeRouter.use('/', decodeFirebaseToken);
resumeRouter.post('/addData', addData);

module.exports = resumeRouter;
