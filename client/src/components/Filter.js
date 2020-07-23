import React from 'react';
import css from './filter.module.css';

export default function Filter({ onChangeFilter, inputFilter }) {
  const handleInputFilter = (event) => {
    onChangeFilter(event.target.value);
  };

  return (
    <div className={css.divFilter}>
      <input
        type="text"
        placeholder="Filtro"
        autoFocus
        onChange={handleInputFilter}
        value={inputFilter}
      />
    </div>
  );
}
