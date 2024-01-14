const express = require('express');
require('dotenv').config();

const cors = require('cors');
const morgan = require('morgan');

const { connectMongo } = require('./src/config/mongo/mongo.config');
const router = require('./src/routes');

const app = express();
// For logging request in console
app.use(morgan('dev'));

const port = process.env.SERVER_PORT;

// These Cors Config is must for HTTP only
const corsOptions = {
  // To dynamically allow requests from all subdomains of midhunnair.tech
  origin(origin, callback) {
    if (!origin || origin.endsWith(`.${process.env.DOMAIN}`)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Establish a connection with mongo
connectMongo();

app.use('/', router);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server Started on http://localhost:${port}`);
});
