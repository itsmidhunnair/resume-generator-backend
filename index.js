const express = require('express');
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const { connectMongo } = require('./src/config/mongo/mongo.config');
const router = require('./src/routes');

const app = express();

app.use(morgan('dev'));

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
  // eslint-disable-next-line no-console
  console.log(`🚀 Server Started on http://localhost:${port}`);
});
