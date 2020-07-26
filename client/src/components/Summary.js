import React, { useEffect, useState } from 'react';
import css from './summary.module.css';

export default function Summary(props) {
  const { filteredTransactions } = props;

  const [filteredIncomes, setFilteredIncomes] = useState(0);
  const [filteredExpenses, setFilteredExpenses] = useState(0);
  const [balanceColor, setBalanceColor] = useState('');
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const isNegative = '#b33939';
    const isPositive = '#218c74';

    setBalance(filteredIncomes - filteredExpenses);

    setBalanceColor(balance < 0 ? isNegative : isPositive);
  }, [balance, filteredExpenses, filteredIncomes]);

  useEffect(() => {
    if (filteredTransactions.length !== 0) {
      const filteredIncomes = filteredTransactions
        .filter((deal) => {
          return deal.type === '+';
        })
        .map((deal) => {
          return deal.value;
        })
        .reduce((acc, curr) => {
          return acc + curr;
        }, 0);

      setFilteredIncomes(filteredIncomes);

      const filteredExpenses = filteredTransactions
        .filter((deal) => {
          return deal.type === '-';
        })
        .map((deal) => {
          return deal.value;
        })
        .reduce((acc, curr) => {
          return acc + curr;
        }, 0);

      setFilteredExpenses(filteredExpenses);

      return;
    }

    setFilteredExpenses(0);
    setFilteredIncomes(0);
  }, [filteredTransactions]);

  return (
    <div className={css.flexRow}>
      <span>
        <b>Lançamentos:</b> {filteredTransactions.length}
      </span>
      <span>
        <b>
          Receitas:{' '}
          <span style={{ color: '#218c74' }}>{`R$ ${filteredIncomes},00`}</span>
        </b>
      </span>
      <span>
        <b>
          Despesas:{' '}
          <span style={{ color: '#b33939' }}>
            {`R$ ${filteredExpenses},00`}
          </span>
        </b>
      </span>
      <span>
        <b>
          Saldo:{' '}
          <span style={{ color: balanceColor }}>{`R$ ${balance},00`}</span>
        </b>
      </span>
    </div>
  );
}
