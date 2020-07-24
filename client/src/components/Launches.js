import React from 'react';
import Launch from './Launch';

export default function Launches(props) {
  const { filteredTransactions, onEdit, onDelete } = props;

  const handleActionButtonClick = (type, id) => {
    switch (type) {
      case 'edit':
        onEdit(id);
        break;
      default:
        onDelete(id);
        break;
    }
  };

  const filteredTransactionsMap = filteredTransactions
    .map((transaction) => {
      return (
        <Launch
          key={transaction._id}
          transaction={transaction}
          onActionButtonClick={handleActionButtonClick}
        />
      );
    })
    .sort((a, b) => {
      return a.props.transaction.day - b.props.transaction.day;
    });

  return <div>{filteredTransactionsMap}</div>;
}
