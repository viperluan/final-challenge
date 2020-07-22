import React, { useEffect, useState } from 'react';
import axios from 'axios';
import M from 'materialize-css';
import PERIODS from './helpers/periods';

import Header from './components/Header';
import DateSelector from './components/DateSelector';
import Launches from './components/Launches';

export default function App() {
  const [currentPeriod, setCurrentPeriod] = useState(PERIODS[18]);
  const [transactions, setTransactions] = useState([]);

  const handleChangePeriod = (newPeriod) => {
    setCurrentPeriod(newPeriod);
  };

  useEffect(() => {
    M.AutoInit();
  }, []);

  useEffect(() => {
    const year = currentPeriod.slice(3);
    const month = currentPeriod.slice(1, 2);
    const url = 'http://localhost:3001/api/transaction';

    const getByDate = async () => {
      const resData = await axios.get(`${url}/${year}/${month}`);

      setTransactions(resData.data);
    };

    getByDate();
  }, [currentPeriod]);

  return (
    <div className="container">
      <Header />
      <DateSelector
        currentPeriod={currentPeriod}
        onChangePeriod={handleChangePeriod}
        allPeriods={PERIODS}
      />
      <Launches transactions={transactions} />
    </div>
  );
}
