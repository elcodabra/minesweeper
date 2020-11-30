
export const range = (start, stop, step = 1, mapFn = (_, i) => start + (i * step)) =>
  Array.from({
    length: (stop - start) / step + 1
  }, mapFn);

export const getRandomNumber = (excluded, size) => {
  let random = 0;
  while (!random || excluded.indexOf(random) > -1) {
    random = Math.round(Math.random() * size);
  }
  return random;
}

export const getRandomArray = (length, bombsSize) => {
  let randoms = [];
  for (let i = 0; i < bombsSize; i++) {
    randoms[i] = getRandomNumber(randoms, length);
  }
  return randoms.sort((a, b) => a - b);
}

export const getSiblings = (num, rows, columns) => {
  if (!num) return null;

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

  return siblings; //.sort((a, b) => a - b);
}

export const getNumberById = (id, rows, columns, bombs) =>
  getSiblings(id, rows, columns).filter(id => bombs.indexOf(id) > -1).length;

export const getSiblingsForId = (id, rows, columns, bombs, siblings = {}) => {
  return getSiblings(id, rows, columns).reduce((acc, curId) => {
    // return if already in set or have bomb
    if (acc[curId] !== undefined || bombs.indexOf(curId) > -1) return acc;

    const number = getNumberById(curId, rows, columns, bombs);
    // if (number === null) return acc;
    if (!number) {
      return getSiblingsForId(curId, rows, columns, bombs, { ...acc, [curId]: number });
    }
    return { ...acc, [curId]: number };
  }, siblings);
}
