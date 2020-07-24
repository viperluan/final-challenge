import React from 'react';
import css from './action.module.css';

export default function Action({ type, id, onClickButton }) {
  const handleClickAction = () => {
    onClickButton(type, id);
  };

  return (
    <span
      className={`material-icons ${css.actionButton}`}
      style={{ cursor: 'pointer' }}
      onClick={handleClickAction}
    >
      {type}
    </span>
  );
}
