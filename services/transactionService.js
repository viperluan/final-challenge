const mongoose = require('mongoose');

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');

const findByDate = async (req, res) => {
  const year = req.params.year;
  const month = req.params.month;

  try {
    const data = await TransactionModel.find({ month, year });

    res.send(data);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const deleteById = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await TransactionModel.findByIdAndDelete({ _id: id });

    res.send(data);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const postNew = async (req, res) => {
  const {
    category,
    day,
    description,
    month,
    type,
    value,
    year,
    yearMonth,
    yearMonthDay,
  } = req.body;

  try {
    const transaction = new TransactionModel({
      category,
      day,
      description,
      month,
      type,
      value,
      year,
      yearMonth,
      yearMonthDay,
    });

    await transaction.save();

    res.send(transaction);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const patchEdit = async (req, res) => {
  const { _id } = req.body;

  try {
    const data = await TransactionModel.findByIdAndUpdate(
      { _id: _id },
      req.body,
      { new: true }
    );

    res.send(data);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

module.exports = { findByDate, deleteById, postNew, patchEdit };
