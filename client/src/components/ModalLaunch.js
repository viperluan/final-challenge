import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Button from './Button';
import css from './modalLaunch.module.css';

Modal.setAppElement('#root');

export default function ModalLaunch(props) {
  const { isModalOpen, onClose, onSave, selectedTransaction } = props;
  const select = Object.entries(selectedTransaction).length > 0;

  const [type, setType] = useState('-');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [value, setValue] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    setType(selectedTransaction.type || '-');
    setDescription(selectedTransaction.description || '');
    setCategory(selectedTransaction.category || '');
    setValue(selectedTransaction.value || '');
    setDate(selectedTransaction.yearMonthDay || '');
  }, [selectedTransaction]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') onClose(null);
  };

  const handleFormatSubmit = (event) => {
    event.preventDefault();

    if (!selectedTransaction._id) {
      const formData = {
        description,
        value,
        category,
        year: date.slice(0, 4),
        month: date.slice(5, 7),
        day: date.slice(-2),
        yearMonth: date.slice(0, 7),
        yearMonthDay: date,
        type,
      };

      onSave(formData);
      return;
    }

    const formData = {
      description,
      value,
      category,
      year: date.slice(0, 4),
      month: date.slice(5, 7),
      day: date.slice(-2),
      yearMonth: date.slice(0, 7),
      yearMonthDay: date,
      type,
      _id: selectedTransaction._id,
    };

    onSave(formData);
  };

  const handleButtonClose = () => {
    onClose(null);
  };

  return (
    <div>
      <Modal style={modalStyles} isOpen={isModalOpen}>
        <header className={css.headerStyle}>
          <span className={css.spanFontSize}>
            {!select ? 'Inclusão de Lançamento' : 'Edição de Lançamento'}
          </span>
          <Button buttonName={'X'} onButtonClick={handleButtonClose} />
        </header>

        <form onSubmit={handleFormatSubmit}>
          <div className={css.flexRow}>
            <div className={css.divRadioButton}>
              <label>
                <input
                  name="inputRadio"
                  type="radio"
                  value={type}
                  checked={type === '-'}
                  disabled={select}
                  onChange={() => setType('-')}
                />
                <span
                  style={{
                    fontSize: '1.5rem',
                    marginRight: '80px',
                    fontWeight: 'bold',
                    color: select ? '' : '#b33939',
                  }}
                >
                  Despesa
                </span>
              </label>
              <label>
                <input
                  name="inputRadio"
                  type="radio"
                  value={type}
                  checked={type === '+'}
                  disabled={select}
                  onChange={() => setType('+')}
                />
                <span
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: select ? '' : '#218c74',
                  }}
                >
                  Receita
                </span>
              </label>
            </div>

            <div>
              <div>
                <label>
                  <span>Descrição:</span>
                  <input
                    type="text"
                    placeholder={`Ex: "Viagem para praia"`}
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </label>
                <label>
                  <span>Categoria:</span>
                  <input
                    type="text"
                    placeholder={`Ex: "Lazer"`}
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                  />
                </label>
              </div>
              <div className={css.divValue}>
                <div className={css.divLabelValue}>
                  <label>
                    <span>Valor:</span>
                    <input
                      type="number"
                      min="1"
                      placeholder={`Ex: "1200"`}
                      value={value}
                      onChange={(event) => setValue(event.target.value)}
                    />
                  </label>
                </div>
                <div className={css.divDate}>
                  <label>
                    <input
                      type="date"
                      min="2019-01-01"
                      max="2021-12-31"
                      value={date}
                      onChange={(event) => setDate(event.target.value)}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <Button
            buttonName={'Salvar'}
            onButtonClick={() => handleFormatSubmit}
          />
        </form>
      </Modal>
    </div>
  );
}

const modalStyles = {
  overlay: { zIndex: 1 },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
