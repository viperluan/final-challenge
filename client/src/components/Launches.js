import React from 'react';
import Launch from './Launch';

export default function Launches({ transactions }) {
  return (
    <div>
      {transactions
        .map((transaction) => {
          return <Launch key={transaction._id} transaction={transaction} />;
        })
        .sort((a, b) => {
          return a.props.transaction.day - b.props.transaction.day;
        })}
    </div>
  );
}
