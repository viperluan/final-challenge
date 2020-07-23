import React from 'react';
import css from './launch.module.css';

export default function Launch({ transaction }) {
  const { day, category, description, value, type } = transaction;
  return (
    <div
      className={css.flexRow}
      style={{ backgroundColor: type === '+' ? '#9AECDB' : '#fab1a0' }}
    >
      <div className={css.divFlex}>
        <div className={css.divDay}>
          <span>{day.toString().padStart(2, 0)}</span>
        </div>
        <div className={css.divDescription}>
          <span className={css.spanCategory}>{category}</span>
          <span className={css.spanDescription}>{description}</span>
        </div>
      </div>
      <div className={css.divValue}>
        <span>{`R$ ${value},00`}</span>
      </div>
    </div>
  );
}
