import React from 'react';
import css from './filter.module.css';

export default function Filter() {
  return (
    <div className={css.divFilter}>
      <input type="text" placeholder="Filtro" autoFocus />
    </div>
  );
}
