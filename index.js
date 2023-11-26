/* eslint-disable implicit-arrow-linebreak */
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { connectMongo } = require('./src/config/mongo/mongo.config');
const router = require('./src/routes');

const app = express();

const port = process.env.SERVER_PORT;

// These Cors Config is must for HTTP only
const corsOptions = {
  origin: '*',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

connectMongo();

app.use('/', router);

app.listen(port, () => {
  console.log(`🚀 Server Started on http://localhost:${port}`);
});
