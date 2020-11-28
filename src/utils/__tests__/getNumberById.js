import { getNumberById } from '../';

const ROWS_10 = 10;
const COLUMNS_10 = 10;
const BOMBS_10 = [1,5,8,10,15,20,22,45,50,100];

it('get number by id', () => {
  expect(getNumberById(1, ROWS_10, COLUMNS_10, BOMBS_10)).toEqual(1);
  expect(getNumberById(10, ROWS_10, COLUMNS_10, BOMBS_10)).toEqual(2);
  expect(getNumberById(100, ROWS_10, COLUMNS_10, BOMBS_10)).toEqual(1);
});
