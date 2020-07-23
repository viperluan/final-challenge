import React from 'react';
import Button from './Button';
import Filter from './Filter';

import css from './filterAndInclue.module.css';

export default function FilterAndInclude() {
  return (
    <div className={css.flexRow}>
      <Button />
      <Filter />
    </div>
  );
}
