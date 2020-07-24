import React from 'react';
import css from './launch.module.css';
import Action from './Action';

export default function Launch({ transaction, onActionButtonClick }) {
  const { day, category, description, value, type, _id } = transaction;

  const handleClickButton = (type, id) => {
    onActionButtonClick(type, id);
  };

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
        <span className={css.spanValue}>{`R$ ${value},00`}</span>
        <span>
          <Action onClickButton={handleClickButton} type={'edit'} id={_id} />
          <Action onClickButton={handleClickButton} type={'delete'} id={_id} />
        </span>
      </div>
    </div>
  );
}
