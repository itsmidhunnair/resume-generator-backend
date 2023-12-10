const express = require('express');
// const { addNewUserInDb } = require('../middleware/accountMiddleware');
const {
  getUserData,
  addData,
  validateDomain,
  addSubdomain,
} = require('../controller/resume.controller');
const { decodeFirebaseToken } = require('../middleware/accountMiddleware');

const resumeRouter = express.Router();

resumeRouter.use('/', decodeFirebaseToken);
resumeRouter.get('/getData', getUserData);
resumeRouter.post('/addData', addData);
resumeRouter.post('/validate-domain', validateDomain);
resumeRouter.post('/add-domain', addSubdomain);

module.exports = resumeRouter;
