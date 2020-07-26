import React from 'react';
import Button from './Button';
import Filter from './Filter';

import css from './filterAndInclue.module.css';

export default function FilterAndInclude(props) {
  const { onChangeInputFilter, inputFilter, onClickNewLaunch } = props;

  const handleInputFilter = (newText) => {
    onChangeInputFilter(newText);
  };

  const handleButtonNewLaunch = () => {
    onClickNewLaunch(null);
  };

  return (
    <div className={css.flexRow}>
      <Button
        buttonName={'+ NOVO LANÇAMENTO'}
        onButtonClick={handleButtonNewLaunch}
      />
      <Filter onChangeFilter={handleInputFilter} inputFilter={inputFilter} />
    </div>
  );
}
