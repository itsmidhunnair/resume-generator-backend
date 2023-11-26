const mongoose = require('mongoose');

const ResumeDataSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
    index: { unique: true },
  },
  subDomain: {
    type: String,
    unique: true,
  },
  title: {
    type: String,
  },
  connection1Icon: {
    type: String,
  },
  connection1Label: {
    type: String,
  },
  connection1Link: {
    type: String,
  },
  connection2Icon: {
    type: String,
  },
  connection2Label: {
    type: String,
  },
  connection2Link: {
    type: String,
  },
});

module.exports = mongoose.model('ResumeData', ResumeDataSchema);
