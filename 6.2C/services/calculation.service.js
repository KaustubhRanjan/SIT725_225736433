const calculateBookAge = (year) => {
  const currentYear = new Date().getFullYear();

  if (typeof year !== 'number' || isNaN(year)) {
    throw new Error('Year must be a number');
  }

  if (year > currentYear) {
    throw new Error('Year cannot be in the future');
  }

  return currentYear - year;
};

module.exports = {
  calculateBookAge
};