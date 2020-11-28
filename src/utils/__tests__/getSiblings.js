import { getSiblings } from '../';

it('get siblings 10x10', () => {
  expect(getSiblings(1, 10, 10)).toHaveLength(4);
  expect(getSiblings(10, 10, 10)).toHaveLength(4);
  expect(getSiblings(90, 10, 10)).toHaveLength(6);
  expect(getSiblings(91, 10, 10)).toHaveLength(4);
  expect(getSiblings(100, 10, 10)).toHaveLength(4);
  expect(getSiblings(0, 10, 10)).toBeNull();
});

it('get random array 100x100', () => {
  const start = performance.now();
  expect(getSiblings(1, 100, 100)).toHaveLength(4);
  expect(getSiblings(10000, 100, 100)).toHaveLength(4);
  const end = performance.now();
  expect(end - start).toBeLessThan(1);
  console.info('Execution time = ', end - start);
});

it('get random array 1000x1000', () => {
  const start = performance.now();
  expect(getSiblings(1, 1000, 1000)).toHaveLength(4);
  expect(getSiblings(1000000, 1000, 1000)).toHaveLength(4);
  const end = performance.now();
  expect(end - start).toBeLessThan(1);
  console.info('Execution time = ', end - start);
});