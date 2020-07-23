import React from 'react';
import Launch from './Launch';

export default function Launches(props) {
  const { transactions, filteredTransactions, isFilter } = props;

  const transactionsMap = transactions
    .map((transaction) => {
      return <Launch key={transaction._id} transaction={transaction} />;
    })
    .sort((a, b) => {
      return a.props.transaction.day - b.props.transaction.day;
    });

  const filteredTransactionsMap = filteredTransactions
    .map((transaction) => {
      return <Launch key={transaction._id} transaction={transaction} />;
    })
    .sort((a, b) => {
      return a.props.transaction.day - b.props.transaction.day;
    });

  return <div>{isFilter ? filteredTransactionsMap : transactionsMap}</div>;
}
