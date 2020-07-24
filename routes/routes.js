const express = require('express');
const transactionRouter = express.Router();

const { findByDate, deleteById } = require('../services/transactionService');

transactionRouter.get('/:year/:month', findByDate);

transactionRouter.delete('/:id', deleteById);

module.exports = transactionRouter;
