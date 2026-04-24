const { expect } = require('chai');
const { calculateBookAge } = require('../services/calculation.service');

describe('Calculation Function Tests', () => {
  it('should calculate book age correctly', () => {
    const result = calculateBookAge(2008);
    expect(result).to.equal(new Date().getFullYear() - 2008);
  });

  it('should return 0 when book year is current year', () => {
    const result = calculateBookAge(new Date().getFullYear());
    expect(result).to.equal(0);
  });

  it('should throw error when year is not a number', () => {
    expect(() => calculateBookAge('abc')).to.throw('Year must be a number');
  });

  it('should throw error when year is in the future', () => {
    expect(() => calculateBookAge(new Date().getFullYear() + 1)).to.throw('Year cannot be in the future');
  });
});