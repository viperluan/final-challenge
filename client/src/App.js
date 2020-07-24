import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PERIODS from './helpers/periods';

import Header from './components/Header';
import DateSelector from './components/DateSelector';
import Summary from './components/Summary';
import Launches from './components/Launches';
import FilterAndInclude from './components/FilterAndInclude';

const URL = 'http://localhost:3001/api/transaction';

export default function App() {
  const [currentPeriod, setCurrentPeriod] = useState(PERIODS[18]);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [inputFilter, setInputFilter] = useState('');
  const [isFilter, setIsFilter] = useState(false);

  const handleChangeInputFilter = (newText) => {
    setInputFilter(newText);
  };

  const handleActionEdit = (id) => {
    console.log(id);
  };

  const handleActionDelete = (id) => {
    axios.delete(`${URL}/${id}`);

    const asDeleted = filteredTransactions.filter((deal) => {
      return deal._id !== id;
    });

    setFilteredTransactions(asDeleted);
  };

  const handleChangePeriod = (newPeriod) => {
    let periodIndex = PERIODS.indexOf(currentPeriod);

    switch (newPeriod) {
      case '<':
        setCurrentPeriod(
          PERIODS[periodIndex !== 0 ? --periodIndex : periodIndex]
        );
        break;
      case '>':
        setCurrentPeriod(
          PERIODS[
            periodIndex !== PERIODS.length - 1 ? ++periodIndex : periodIndex
          ]
        );
        break;
      default:
        setCurrentPeriod(
          PERIODS.filter((period) => {
            return period === newPeriod;
          }).toString()
        );
        break;
    }
  };

  useEffect(() => {
    setIsFilter(inputFilter !== '' ? true : false);
  }, [inputFilter]);

  useEffect(() => {
    const getByDate = async () => {
      const year = currentPeriod.slice(3);
      const month = currentPeriod.slice(0, 2);

      const resData = await axios.get(`${URL}/${year}/${month}`);

      setTransactions(resData.data);
      setFilteredTransactions(resData.data);
    };

    getByDate();
  }, [currentPeriod]);

  useEffect(() => {
    if (isFilter) {
      const filter = transactions.filter(({ description }) => {
        return description.toLowerCase().includes(inputFilter.toLowerCase());
      });

      setFilteredTransactions(filter);
    }
  }, [isFilter, inputFilter, transactions]);

  return (
    <div className="container">
      <Header />
      <DateSelector
        currentPeriod={currentPeriod}
        onChangePeriod={handleChangePeriod}
        periods={PERIODS}
      />
      <Summary
        filteredTransactions={filteredTransactions}
        isFilter={isFilter}
      />
      <FilterAndInclude
        onChangeInputFilter={handleChangeInputFilter}
        inputFilter={inputFilter}
      />
      <Launches
        filteredTransactions={filteredTransactions}
        onEdit={handleActionEdit}
        onDelete={handleActionDelete}
      />
    </div>
  );
}
