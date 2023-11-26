const { firebaseAuth } = require('../config/firebase/firebase.config');

/**
 * To get User Details from the Received Token
 *
 * @param {string} token
 *
 * @returns User Details
 */
const verifyToken = (token) => firebaseAuth.verifyIdToken(token);

module.exports = { verifyToken };
