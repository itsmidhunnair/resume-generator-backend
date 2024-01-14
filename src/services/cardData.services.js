const { handleError } = require('../helpers');
const cardDataSchema = require('../model/mongoSchema/cardDataSchema');
const CardDataSchema = require('../model/mongoSchema/cardDataSchema');

/**
 * To add a basic data of user to DB
 * this includes the Name, email and picture url
 */
const addUserToDb = async ({ email, name, picture }) => {
  const data = new CardDataSchema({
    email,
    name,
    img: picture,
  });
  return data.save();
};

/**
 * To get all data of user from DB
 */
const getAllData = async ({ email, subDomain }, display = []) => {
  const data = await CardDataSchema.findOne({
    $or: [{ email }, { subDomain }],
  }, display);
  if (data) {
    return data;
  }
  if (data === null) {
    return handleError(404, 'No User Found');
  }
  return handleError();
};

/**
 * To add user subdomain in DB
 */
const bindSubdomain = async ({ email, subdomain, subDomainId }) => CardDataSchema.findOneAndUpdate(
  { email },
  { $set: { subDomain: subdomain, subDomainId } },
  { new: true },
);

/**
 * To Add User Data to DB
 *
 * @param {string} email
 * @param {Object} data
 */
const allDataToDb = async (email, data) => CardDataSchema.findOneAndUpdate(
  { email },
  {
    $set: data,
  },
);

/**
 * To DELETE a User data from DB
 */
const deleteFromDb = async (email) => {
  await cardDataSchema.deleteOne({ email });
};

module.exports = {
  addUserToDb,
  getAllData,
  allDataToDb,
  bindSubdomain,
  deleteFromDb,
};
