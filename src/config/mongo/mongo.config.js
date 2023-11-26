const mongoose = require('mongoose');

// To Establish a connection with mongo
async function connectMongo() {
  const mongoString = process.env.DATABASE_URL;
  try {
    await mongoose.connect(mongoString);
    console.log('Monogo DB Connected Successfully');
  } catch (error) {
    console.log(error);
  }
}

module.exports = { connectMongo };
