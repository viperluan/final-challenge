const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

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

module.exports = { findByDate };
