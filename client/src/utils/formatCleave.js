export const convertMoneyToNumber = (money) => {
  if (typeof money === 'string') {
    return money.replace('$ ', '').split(',').join('');
  } else {
    return money;
  }
};