const firebaseAdmin = require('firebase-admin');
const { firebaseCredentials } = require('./firebaseCredentials');

const firebaseApp = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(firebaseCredentials),
});

const firebaseAuth = firebaseApp.auth();

module.exports = { firebaseAuth, firebaseApp };
