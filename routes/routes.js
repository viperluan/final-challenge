const express = require('express');
const transactionRouter = express.Router();

const {
  findByDate,
  deleteById,
  postNew,
  patchEdit,
} = require('../services/transactionService');

transactionRouter.get('/:year/:month', findByDate);

transactionRouter.delete('/:id', deleteById);

transactionRouter.post('/', postNew);

transactionRouter.patch('/', patchEdit);

module.exports = transactionRouter;
