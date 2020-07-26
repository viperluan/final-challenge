const formatter = new Intl.NumberFormat([], {
  style: 'currency',
  currency: 'BRL',
});

const numberFormat = (value) => {
  return formatter.format(value);
};

export default numberFormat;
