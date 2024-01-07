const express = require('express');
// const { addNewUserInDb } = require('../middleware/accountMiddleware');
const {
  getUserData,
  addData,
  validateDomain,
  addSubdomain,
} = require('../controller/data.controller');
const { decodeFirebaseToken } = require('../middleware/accountMiddleware');
const { filterUserAccountData } = require('../middleware/dataMiddleware');

const router = express.Router();

router.use('/', decodeFirebaseToken);
router.get('/get-data', getUserData);
router.post('/add-data', filterUserAccountData, addData);
router.post('/validate-domain', validateDomain);
router.post('/add-domain', addSubdomain);

module.exports = router;
