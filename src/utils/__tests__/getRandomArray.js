import { getRandomArray } from '../';

it('get random array', () => {
  expect(getRandomArray(100, 10)).toHaveLength(10);
});

it('get random array with excluded', () => {
  expect(getRandomArray(100, 10, [1,2,3,4,5])).toHaveLength(10);
});

it('get random array 100x100', () => {
  const start = performance.now();
  expect(getRandomArray(100, 100)).toHaveLength(100);
  const end = performance.now();
  expect(end - start).toBeLessThan(2);
  console.info('Execution time = ', end - start);
});
