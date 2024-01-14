const mongoose = require('mongoose');

const CardDataSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
    index: { unique: true },
  },
  img: {
    required: true,
    type: String,
  },
  subDomain: {
    type: String,
    unique: true,
    lowercase: true,
  },
  subDomainId: {
    type: String,
    unique: true,
  },
  title: {
    type: String,
  },
  key1: {
    type: String,
  },
  value1: {
    type: String,
  },
  key2: {
    type: String,
  },
  value2: {
    type: String,
  },
  connectLabel: {
    type: String,
  },
  connectLink: {
    type: String,
  },
});

module.exports = mongoose.model('card-data', CardDataSchema);
