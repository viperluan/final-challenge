import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PERIODS from './helpers/periods';

import Header from './components/Header';
import DateSelector from './components/DateSelector';
import Summary from './components/Summary';
import Launches from './components/Launches';
import FilterAndInclude from './components/FilterAndInclude';
import ModalLaunch from './components/ModalLaunch';

const BASE_URL = 'https://pcf-final-challenge.herokuapp.com/api/transaction';

export default function App() {
  const [currentPeriod, setCurrentPeriod] = useState(PERIODS[18]);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState({});
  const [inputFilter, setInputFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getByDate = async () => {
      const year = currentPeriod.slice(3);
      const month = currentPeriod.slice(0, 2);

      try {
        const resData = await axios.get(`${BASE_URL}/${year}/${month}`);

        setTransactions(resData.data);
        setFilteredTransactions(resData.data);
      } catch (error) {
        console.log(error);
      }
    };

    getByDate();
  }, [currentPeriod]);

  useEffect(() => {
    if (inputFilter !== '') {
      const filter = transactions.filter(({ description }) => {
        return description.toLowerCase().includes(inputFilter.toLowerCase());
      });

      setFilteredTransactions(filter);
      return;
    }
    setFilteredTransactions(transactions);
  }, [inputFilter, transactions]);

  const handleChangeInputFilter = (newText) => {
    setInputFilter(newText);
  };

  const handleActionEdit = (id) => {
    const newSelect = filteredTransactions.filter((deal) => {
      return deal._id === id;
    });

    setSelectedTransaction(newSelect[0]);
    setIsModalOpen(true);
  };

  const handleActionDelete = async (id) => {
    try {
      const isDelete = await axios.delete(`${BASE_URL}/${id}`);

      if (isDelete.status === 200) {
        window.alert('Lançamento excluído com sucesso!');
      }

      const asDeleted = filteredTransactions.filter((deal) => {
        return deal._id !== id;
      });

      setFilteredTransactions(asDeleted);
      setTransactions(asDeleted);
    } catch (error) {
      console.log('error');
    }
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

  const handleClickNewLaunch = () => {
    setIsModalOpen(true);
  };

  const handleButtonSave = async (formData) => {
    if (!formData._id) {
      try {
        const isInsert = await axios.post(BASE_URL, formData);

        if (isInsert.status === 200) {
          window.alert('Lançamento inserido com sucesso!');
        }

        const asInsert = [...transactions, isInsert.data];

        setFilteredTransactions(asInsert);
        setTransactions(asInsert);

        setIsModalOpen(false);
        setSelectedTransaction({});
      } catch (error) {
        console.log(error);
      }
      return;
    }
    try {
      const isEdit = await axios.patch(BASE_URL, formData);

      if (isEdit.status === 200) {
        window.alert('Lançamento editado com sucesso!');
      }

      const newTransactions = transactions.filter((deal) => {
        return deal._id !== formData._id;
      });

      setFilteredTransactions([...newTransactions, formData]);
      setTransactions([...newTransactions, formData]);

      setIsModalOpen(false);
      setSelectedTransaction({});
    } catch (error) {
      console.log(error);
    }
  };

  const handleButtonClose = () => {
    setIsModalOpen(false);
    setSelectedTransaction({});
  };

  return (
    <div className="container">
      <Header />

      <DateSelector
        currentPeriod={currentPeriod}
        onChangePeriod={handleChangePeriod}
        periods={PERIODS}
      />

      <Summary filteredTransactions={filteredTransactions} />

      <FilterAndInclude
        onChangeInputFilter={handleChangeInputFilter}
        inputFilter={inputFilter}
        onClickNewLaunch={handleClickNewLaunch}
      />

      <Launches
        filteredTransactions={filteredTransactions}
        onEdit={handleActionEdit}
        onDelete={handleActionDelete}
      />

      <ModalLaunch
        isModalOpen={isModalOpen}
        onSave={handleButtonSave}
        onClose={handleButtonClose}
        selectedTransaction={selectedTransaction}
      />
    </div>
  );
}
