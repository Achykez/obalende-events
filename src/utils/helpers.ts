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

export const getFileFromPath = async (path: string): Promise<File> => {
  const response = await fetch(path); // Fetch the file from the given path
  const blob = await response.blob();

  // Create a File object
  const fileName = path.split("/").pop() || "uploaded_file";
  return new File([blob], fileName, { type: blob.type });
};