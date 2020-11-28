import { getRandomNumber } from '../';

it('get random number', () => {
  expect(getRandomNumber([], 10)).toBeGreaterThanOrEqual(1);
  expect(getRandomNumber([], 10)).toBeLessThanOrEqual(10);
});

it('get random number with excluded values', () => {
  expect(getRandomNumber([1], 2)).not.toEqual(1);
  expect(getRandomNumber([1], 2)).toEqual(2);
  expect(getRandomNumber([2], 2)).toEqual(1);
});
