import React, { useEffect, useState } from 'react';
import css from './summary.module.css';

export default function Summary(props) {
  const { transactions, filteredTransactions, isFilter } = props;

  const [incomes, setIncomes] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [filteredIncomes, setFilteredIncomes] = useState(0);
  const [filteredExpenses, setFilteredExpenses] = useState(0);
  const [balanceColor, setBalanceColor] = useState('');
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    switch (isFilter) {
      case false:
        setBalance(incomes - expenses);
        break;
      default:
        setBalance(filteredIncomes - filteredExpenses);
        break;
    }
  }, [incomes, expenses, filteredIncomes, filteredExpenses, isFilter]);

  useEffect(() => {
    const isNegative = '#b33939';
    const isPositive = '#218c74';
    setBalanceColor(balance < 0 ? isNegative : isPositive);
  }, [balance]);

  useEffect(() => {
    if (transactions.length !== 0 && !isFilter) {
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

    if (transactions.length !== 0 && !isFilter) {
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
  }, [transactions, isFilter]);

  useEffect(() => {
    if (filteredTransactions.length !== 0 && isFilter) {
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
    }

    if (filteredTransactions.length !== 0 && isFilter) {
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
    }
  }, [filteredTransactions, isFilter]);

  return (
    <div className={css.flexRow}>
      <span>
        <b>Lançamentos:</b>{' '}
        {isFilter ? filteredTransactions.length : transactions.length}
      </span>
      <span>
        <b>
          Receitas:{' '}
          <span style={{ color: '#218c74' }}>
            {isFilter ? `R$ ${filteredIncomes},00` : `R$ ${incomes},00`}
          </span>
        </b>
      </span>
      <span>
        <b>
          Despesas:{' '}
          <span style={{ color: '#b33939' }}>
            {isFilter ? `R$ ${filteredExpenses},00` : `R$ ${expenses},00`}
          </span>
        </b>
      </span>
      <span>
        <b>
          Saldo:{' '}
          <span style={{ color: balanceColor }}>
            {isFilter
              ? `R$ ${filteredIncomes - filteredExpenses},00`
              : `R$ ${incomes - expenses},00`}
          </span>
        </b>
      </span>
    </div>
  );
}
