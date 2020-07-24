import React from 'react';
import Button from './Button';
import Filter from './Filter';

import css from './filterAndInclue.module.css';

export default function FilterAndInclude({ onChangeInputFilter, inputFilter }) {
  const handleInputFilter = (newText) => {
    onChangeInputFilter(newText);
  };

  const handleButtonClick = (value) => {};

  return (
    <div className={css.flexRow}>
      <Button
        buttonName={'+ NOVO LANÇAMENTO'}
        onButtonClick={handleButtonClick}
      />
      <Filter onChangeFilter={handleInputFilter} inputFilter={inputFilter} />
    </div>
  );
}
