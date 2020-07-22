import React, { useEffect, useState } from 'react';
import M from 'materialize-css';
import PERIODS from './helpers/periods';

import Header from './components/Header';
import DateSelector from './components/DateSelector';

export default function App() {
  const [currentPeriod, setCurrentPeriod] = useState(PERIODS[18]);

  const handleChangePeriod = (newPeriod) => {
    setCurrentPeriod(newPeriod);
  };

  useEffect(() => {
    M.AutoInit();
  }, []);

  return (
    <div className="container">
      <Header />
      <DateSelector
        currentPeriod={currentPeriod}
        onChangePeriod={handleChangePeriod}
        allPeriods={PERIODS}
      />
    </div>
  );
}
