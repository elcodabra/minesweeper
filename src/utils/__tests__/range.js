import { range } from '../';

it('create range array', () => {
  const result = range(1, 10);
  expect(result).toHaveLength(10);
  expect(result[0]).toEqual(1);
  expect(result[9]).toEqual(10);
});

it('create range array with step=2', () => {
  const result = range(1, 10, 2);
  expect(result).toHaveLength(5);
  expect(result[0]).toEqual(1);
  expect(result[4]).toEqual(9);
});

it('create range array and map fn', () => {
  const result = range(1, 10, 1, (_, id) => ({ id }));
  expect(result).toHaveLength(10);
  expect(result[0].id).toEqual(0);
  expect(result[9].id).toEqual(9);
});