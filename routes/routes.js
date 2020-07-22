const express = require('express');
const transactionRouter = express.Router();

const { findByDate } = require('../services/transactionService');

transactionRouter.get('/:year/:month', findByDate);

module.exports = transactionRouter;
