const express = require('express');
const accountRouter = require('./account.route');
const cardRouter = require('./card.route');

const router = express.Router();

router.get(
  '/',
  (req, res) => res.send(
    "<marquee behavior='scroll'>MN's Card Generator Server Active!</marquee>",
  ),
  // eslint-disable-next-line function-paren-newline
);
router.use('/account', accountRouter);
router.use('/card', cardRouter);

module.exports = router;
