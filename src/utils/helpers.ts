export const formatCurrency = (value: number, currency: string) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    minimumFractionDigits: 0,
    currency,
    currencyDisplay: 'narrowSymbol',
  }).format(value);
};

export const formatPrice = (price = 0) => {
  let fullPrice = '';
  const [whole] = price.toString().split('.');
  fullPrice = formatCurrency(+whole, 'NGN');
  return fullPrice;
};
