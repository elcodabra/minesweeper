import React, { useState } from 'react';

import Cell from '../Cell';

import './Field.css';

const range = (start, stop, step = 1) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));

const BOMBS_LENGTH = 5;

const getRandomNumber = (excluded, size) => {
  let random = 0;
  while (!random || excluded.indexOf(random) > -1) {
    random = Math.floor(Math.random() * size);
  }
  return random;
}

const getSiblings = (num, rows, columns) => {
  let siblings = [];

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

  return siblings.sort();
}

const getSiblingsForId = (id, rows, columns, bombs, siblings = {}) =>
  getSiblings(id, rows, columns).reduce((acc, curId, idx, src) => {
    // return if already in set or have bomb
    if (acc[curId] !== undefined || bombs.indexOf(curId) > -1) return acc;

    const number = getNumberById(curId, rows, columns, bombs);
    if (!number) {
      return getSiblingsForId(curId, rows, columns, bombs, { ...acc, [curId]: number });
    }
    return { ...acc, [curId]: number };
  }, siblings);

const getNumberById = (id, rows, columns, bombs) =>
  getSiblings(id, rows, columns).filter(id => bombs.indexOf(id) > -1).length;

/*
const numbers = {
  1: 2,
  2: 0,
  4: 3,
}


*/

const Field = () => {
  const [bombs, setBombs] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [opened, setOpened] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [fail, setFail] = useState(null);
  console.log('Field');

  const rows = 5;
  const columns = 5;
  const length = rows * columns;

  const handleClick = (id) => {
    if (!bombs.length) {
      let randoms = [];
      let numbersBeforeBombs = [];
      for (let i = 0; i < BOMBS_LENGTH; i++) {
        randoms[i] = getRandomNumber([id, ...randoms], length);
      }
      for (let i = 0; i < length; i++) {
        const number = getNumberById(i + 1, rows, columns, randoms);
        numbersBeforeBombs[i] = randoms.indexOf(i + 1) > -1 ? false : number;
      }
      const siblings = getSiblingsForId(id, rows, columns, randoms);
      console.log('siblings:', siblings);
      setBombs(randoms);
      setNumbers(numbersBeforeBombs);
      setOpened([...Object.keys(siblings).map(item => parseInt(item)), id]);
    } else {
      if (bombs.indexOf(id) > -1) {
        setOpened(range(1, length));
        setFail(id);
      } else if (opened.indexOf(id) === -1) {
        const siblings = getSiblingsForId(id, rows, columns, bombs);
        console.log('siblings:', siblings);
        setOpened([...new Set([...opened, ...Object.keys(siblings).map(item => parseInt(item)), id])]);
      }
    }
  }

  const handleRightClick = (id) => {
    if (completed.indexOf(id) > -1) {
      const array = [...completed];
      array.splice(completed.indexOf(id), 1);
      setCompleted(array);
    } else {
      setCompleted([ ...completed, id ])
    }
  }

  const isSuccess = completed.length === BOMBS_LENGTH && opened.length === length - BOMBS_LENGTH;
  const isFail = fail !== null;

  console.log('numbers:', numbers);
  console.log('completed:', completed.length);
  console.log('opened:', opened.length);
  console.log('bombs:', bombs.length);

  return (
    <div className="Field">
      {(isSuccess || isFail) && (
        <div className="Field-message">
          {isSuccess && (
            <p>Your win!</p>
          )}
          {isFail && (
            <p>Fail!</p>
          )}
        </div>
      )}
      <div className="Field-container" style={{ gridTemplateColumns: `repeat(${columns}, 50px [col-start])`, pointerEvents: isSuccess || isFail ? 'none' : 'all' }}>
        {range(1, length).map(id => (
          <Cell
            key={id}
            id={id}
            number={getNumberById(id, rows, columns, bombs)}
            isCompleted={completed.indexOf(id) > -1}
            isOpened={opened.indexOf(id) > -1}
            isFailed={fail === id}
            isBomb={bombs && bombs.indexOf(id) > -1}
            onClick={handleClick}
            onRightClick={handleRightClick}
          />
        ))}
      </div>
    </div>
  )
}

export default React.memo(Field);