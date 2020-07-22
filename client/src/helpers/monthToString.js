const formatter = (period) => {
  const month = period.slice(0, 2);
  const year = period.slice(2);
  let newMonth = '';

  switch (month) {
    case '01':
      newMonth = 'Jan';
      break;
    case '02':
      newMonth = 'Fev';
      break;
    case '03':
      newMonth = 'Mar';
      break;
    case '04':
      newMonth = 'Abr';
      break;
    case '05':
      newMonth = 'Mai';
      break;
    case '06':
      newMonth = 'Jun';
      break;
    case '07':
      newMonth = 'Jul';
      break;
    case '08':
      newMonth = 'Ago';
      break;
    case '09':
      newMonth = 'Set';
      break;
    case '10':
      newMonth = 'Out';
      break;
    case '11':
      newMonth = 'Nov';
      break;
    case '12':
      newMonth = 'Dez';
      break;
    default:
      newMonth = 'Mês Inválido';
      break;
  }

  return newMonth + year;
};

export default formatter;
