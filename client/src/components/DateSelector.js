import React from 'react';
import formatter from '../helpers/monthToString';

export default function DateSelector(props) {
  const { currentPeriod, onChangePeriod, allPeriods } = props;

  const handleSelectChange = (event) => {
    onChangePeriod(event.target.value);
  };

  return (
    <div>
      <select value={currentPeriod} onChange={handleSelectChange}>
        {allPeriods.map((period) => {
          return (
            <option key={period} value={period}>
              {formatter(period)}
            </option>
          );
        })}
      </select>
    </div>
  );
}
