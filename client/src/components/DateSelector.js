import React from 'react';
import formatter from '../helpers/monthToString';
import Button from './Button';
import css from './dateSelector.module.css';

export default function DateSelector(props) {
  const { currentPeriod, onChangePeriod, periods } = props;

  const handleSelectChange = (event) => {
    onChangePeriod(event.target.value);
  };

  const handleButtonClick = (buttonClick) => {
    onChangePeriod(buttonClick);
  };

  return (
    <div className={css.flexRow}>
      <Button buttonName={'<'} onButtonClick={handleButtonClick} />
      <div className={css.divSelect}>
        <select
          className={`browser-default ${css.selectDate}`}
          value={currentPeriod}
          onChange={handleSelectChange}
        >
          {periods.map((period) => {
            return (
              <option key={period} value={period}>
                {formatter(period)}
              </option>
            );
          })}
        </select>
      </div>
      <Button buttonName={'>'} onButtonClick={handleButtonClick} />
    </div>
  );
}
