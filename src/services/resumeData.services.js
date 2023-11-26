const ResumeDataSchema = require('../model/mongoSchema/resumeDataSchema');

const addUserToDb = async ({ email, name }) => {
  const data = new ResumeDataSchema({
    email,
    name,
  });
  return data.save();
};

const getAllData = async ({ email, subDomain }) => {
  if (email) {
    return ResumeDataSchema.findOne({ email });
  }
  if (subDomain) {
    return ResumeDataSchema.findOne({ subDomain });
  }
  return null;
};

const allDataToDb = async (
  email,
  {
    name,
    subDomain,
    title,
    connection1Icon,
    connection1Label,
    connection1Link,
    connection2Icon,
    connection2Label,
    connection2Link,
  },
) =>
  ResumeDataSchema.findOneAndUpdate(
    { email },
    {
      $set: {
        name,
        subDomain,
        title,
        connection1Icon,
        connection1Label,
        connection1Link,
        connection2Icon,
        connection2Label,
        connection2Link,
      },
    },
  );

module.exports = { addUserToDb, getAllData, allDataToDb };
