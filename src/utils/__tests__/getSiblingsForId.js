import { getSiblingsForId, getRandomArray } from '../';

const ROWS_10 = 10;
const COLUMNS_10 = 10;
const BOMBS_10 = [1,5,8,10,15,20,22,45,50,100];

it('get siblings for id 10x10', () => {
  expect(getSiblingsForId(1, ROWS_10, COLUMNS_10, BOMBS_10)).toMatchObject({ '2': 1, '11': 2, '12': 2 });
  expect(getSiblingsForId(10, ROWS_10, COLUMNS_10, BOMBS_10)).toMatchObject({ '9': 3, '19': 3 });
  expect(getSiblingsForId(50, ROWS_10, COLUMNS_10, BOMBS_10)).toMatchObject({ '39': 1, '40': 1, '49': 1, '59': 1, '60': 1 });
  expect(getSiblingsForId(100, ROWS_10, COLUMNS_10, BOMBS_10)).toMatchObject({ '89': 1, '90': 1, '99': 1 });
});
/*
it('get siblings for id 100x100 with fn', () => {
  getSiblingsForId(150, 50, 50, getRandomArray(2500, 50), {}, acc => console.log(Object.keys(acc)));
});
*/