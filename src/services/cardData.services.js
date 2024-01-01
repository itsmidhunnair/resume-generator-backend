const { handleError } = require('../helpers');
const CardDataSchema = require('../model/mongoSchema/cardDataSchema');

const addUserToDb = async ({ email, name, picture }) => {
  const data = new CardDataSchema({
    email,
    name,
    img: picture,
  });
  return data.save();
};

const getAllData = async ({ email, subDomain }) => {
  const data = await CardDataSchema.findOne({
    $or: [{ email }, { subDomain }],
  });
  if (data) {
    return data;
  }
  if (data === null) {
    handleError(404, 'No User Found');
  }
  handleError();
};

//
const bindSubdomain = async ({ email, subdomain }) =>
  CardDataSchema.findOneAndUpdate(
    { email },
    { $set: { subDomain: subdomain } },
  );

const allDataToDb = async (email, data) =>
  CardDataSchema.findOneAndUpdate(
    { email },
    {
      $set: data,
    },
  );

module.exports = {
  addUserToDb,
  getAllData,
  allDataToDb,
  bindSubdomain,
};
