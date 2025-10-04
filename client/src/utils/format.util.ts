const toCurrencyString = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  })
    .format(amount)
    .replace('₫', 'đ'); // swap symbol if needed
};

const toCurrency = (str: string) => {
  if (typeof str !== 'string') return NaN;

  return Number(str.replace(/[^\d]/g, '')); // remove all non-digit characters (., đ, spaces)
};

const appendIfExist = (params: URLSearchParams, key: string, value: string) => {
  let alreadyExists = false;

  params.getAll(key).forEach((v) => {
    if (v === value) alreadyExists = true;
  });

  if (!alreadyExists) {
    params.append(key, value);
  }
};

const toggleParam = (params: URLSearchParams, key: string, value: string) => {
  const values = params.getAll(key);

  if (values.includes(value)) {
    params.delete(key);
    values.filter((v) => v !== value).forEach((v) => params.append(key, v));
  } else {
    params.append(key, value);
  }
};

export { toCurrency, toCurrencyString, appendIfExist, toggleParam };
