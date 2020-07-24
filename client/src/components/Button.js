import React from 'react';

export default function Button({ buttonName, onButtonClick }) {
  const handleButtonClick = (event) => {
    onButtonClick(event.target.value);
  };

  return (
    <div>
      <button
        className="waves-effect waves-light btn"
        value={buttonName}
        onClick={handleButtonClick}
      >
        {buttonName}
      </button>
    </div>
  );
}
