import React, { useEffect, useState } from 'react';
import axios from 'axios';
import M from 'materialize-css';
import PERIODS from './helpers/periods';

import Header from './components/Header';
import DateSelector from './components/DateSelector';
import Summary from './components/Summary';
import Launches from './components/Launches';
import FilterAndInclude from './components/FilterAndInclude';

export default function App() {
  const [currentPeriod, setCurrentPeriod] = useState(PERIODS[18]);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [inputFilter, setInputFilter] = useState('');
  const [isFilter, setIsFilter] = useState(false);

  const handleChangePeriod = (newPeriod) => {
    setCurrentPeriod(newPeriod);
  };

  useEffect(() => {
    M.AutoInit();
  }, []);

  useEffect(() => {
    const year = currentPeriod.slice(3);
    const month = currentPeriod.slice(0, 2);
    const url = 'http://localhost:3001/api/transaction';

    const getByDate = async () => {
      const resData = await axios.get(`${url}/${year}/${month}`);

      setTransactions(resData.data);
    };

    getByDate();
  }, [currentPeriod]);

  const handleChangeInputFilter = (newText) => {
    setInputFilter(newText);
  };

  useEffect(() => {
    setIsFilter(inputFilter !== '' ? true : false);
  }, [inputFilter]);

  useEffect(() => {
    if (isFilter) {
      const filter = transactions.filter(({ description }) => {
        return description.toLowerCase().includes(inputFilter.toLowerCase());
      });

      setFilteredTransactions(filter);
    }
  }, [inputFilter, isFilter, transactions]);

  return (
    <div className="container">
      <Header />
      <DateSelector
        currentPeriod={currentPeriod}
        onChangePeriod={handleChangePeriod}
        allPeriods={PERIODS}
      />
      <Summary
        transactions={transactions}
        filteredTransactions={filteredTransactions}
        isFilter={isFilter}
      />
      <FilterAndInclude
        onChangeInputFilter={handleChangeInputFilter}
        inputFilter={inputFilter}
      />
      <Launches
        transactions={transactions}
        filteredTransactions={filteredTransactions}
        isFilter={isFilter}
        inputFilter={inputFilter}
      />
    </div>
  );
}
