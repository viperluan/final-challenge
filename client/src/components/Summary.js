import React, { useEffect, useState } from 'react';
import css from './summary.module.css';

export default function Summary({ transactions }) {
  const [incomes, setIncomes] = useState(0);
  const [expenses, setExpenses] = useState(0);

  useEffect(() => {
    if (transactions.length !== 0) {
      const incomes = transactions
        .filter((deal) => {
          return deal.type === '+';
        })
        .map((deal) => {
          return deal.value;
        })
        .reduce((acc, curr) => {
          return acc + curr;
        }, 0);

      setIncomes(incomes);
    }

    if (transactions.length !== 0) {
      const expenses = transactions
        .filter((deal) => {
          return deal.type === '-';
        })
        .map((deal) => {
          return deal.value;
        })
        .reduce((acc, curr) => {
          return acc + curr;
        }, 0);

      setExpenses(expenses);
    }
  }, [transactions]);

  return (
    <div className={css.flexRow}>
      <span>
        <b>Lançamentos:</b> {transactions.length}
      </span>
      <span>
        <b>
          Receitas:{' '}
          <span style={{ color: '#218c74' }}>{`R$ ${incomes},00`}</span>
        </b>
      </span>
      <span>
        <b>
          Despesas:{' '}
          <span style={{ color: '#b33939' }}>{`R$ ${expenses},00`}</span>
        </b>
      </span>
      <span>
        <b>
          Saldo:{' '}
          <span style={{ color: '#218c74' }}>{`R$ ${
            incomes - expenses
          },00`}</span>
        </b>
      </span>
    </div>
  );
}
