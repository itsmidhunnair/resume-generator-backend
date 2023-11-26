const express = require('express');
const accountRouter = require('./account.route');
const resumeRouter = require('./resume.route');

const router = express.Router();

router.get(
  '/',
  (req, res) =>
    res.send(
      "<marquee behavior='scroll'>MN's Resume Generator Server Active!</marquee>",
    ),
  // eslint-disable-next-line function-paren-newline
);
router.use('/account', accountRouter);
router.use('/resume', resumeRouter);

module.exports = router;
