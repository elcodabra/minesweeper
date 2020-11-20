
export const range = (start, stop, step = 1) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));

export const getRandomNumber = (excluded, size) => {
  let random = 0;
  while (!random || excluded.indexOf(random) > -1) {
    random = Math.floor(Math.random() * size);
  }
  return random;
}

export const getRandomArray = (length, bombsSize) => {
  let randoms = [];
  for (let i = 0; i < bombsSize; i++) {
    // TODO: hide bomb number & add compare fn for num
    randoms[i] = getRandomNumber(randoms, length);
  }
  return randoms;
}

export const getSiblings = (num, rows, columns) => {
  let siblings = [num];

  const x = num % columns || columns;
  const y = Math.ceil(num / columns);

  if (x - 1 > 0) {
    siblings.push(num - 1);

    if (y - 1 > 0) {
      siblings.push(num - 1 - columns);
    }

    if (y + 1 <= rows) {
      siblings.push(num - 1 + columns);
    }
  }

  if (y - 1 > 0) {
    siblings.push(num - columns);
  }

  if (y + 1 <= rows) {
    siblings.push(num + columns);
  }

  if (x + 1 <= columns) {
    siblings.push(num + 1);

    if (y - 1 > 0) {
      siblings.push(num + 1 - columns);
    }

    if (y + 1 <= rows) {
      siblings.push(num + 1 + columns);
    }
  }

  return siblings;
}

export const getSiblingsForId = (id, rows, columns, bombs, siblings = {}) =>
  getSiblings(id, rows, columns).reduce((acc, curId, idx, src) => {
    // return if already in set or have bomb
    if (acc[curId] !== undefined || bombs.indexOf(curId) > -1) return acc;

    const number = getNumberById(curId, rows, columns, bombs);
    if (!number) {
      return getSiblingsForId(curId, rows, columns, bombs, { ...acc, [curId]: number });
    }
    return { ...acc, [curId]: number };
  }, siblings);

export const getNumberById = (id, rows, columns, bombs) =>
  getSiblings(id, rows, columns).filter(id => bombs.indexOf(id) > -1).length;
