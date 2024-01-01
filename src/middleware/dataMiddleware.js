const { filterObjects } = require('../helpers');

/**
 * Middleware to filer about user specific information
 * (those informations that should not be edited)
 *  like email, subdomain, etc.
 */
const filterUserAccountData = (req, res, next) => {
  if (req.body) {
    const userDataKeys = Object.keys(req.userData).filter(
      (key) => key !== 'name',
    );
    filterObjects(req.body, [...userDataKeys, 'subDomain']);
    return next();
  }
  return next();
};

module.exports = { filterUserAccountData };
