import React, { useState } from 'react';

import Cell from '../Cell';

import './Field.css';

const range = (start, stop, step = 1) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));

const BOMBS_LENGTH = 10;

const getRandomNumber = (excluded, size) => {
  let random = -1;
  while (random === -1 || excluded.indexOf(random) > -1) {
    random = Math.floor(Math.random() * size);
  }
  return random;
}

const getSiblings = (num, rows, columns) => {
  let siblings = [];

  const x = num % columns || columns;
  const y = Math.ceil(num / columns);
  const length = rows * columns;

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

  if (y + 1 <= length) {
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

const getNumbersForId = (id, rows, columns, bombs) => {
  const siblings = getSiblings(id, rows, columns);
  return siblings.filter(id => bombs.indexOf(id) === -1);
}

const Field = () => {
  const [bombs, setBombs] = useState([]);
  const [opened, setOpened] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [fail, setFail] = useState(null);
  console.log('Field');

  const rows = 5;
  const columns = 5;
  const length = rows * columns;

  const handleClick = (id) => {
    if (!bombs.length) {
      let randoms = []
      for (let i = 0; i < BOMBS_LENGTH; i++) {
        // TODO: refactor
        randoms[i] = getRandomNumber([id, ...randoms], length);
      }
      const siblings = getNumbersForId(id, rows, columns, randoms);
      setBombs(randoms);
      setOpened([...siblings, id]);
    } else {
      if (bombs.indexOf(id) > -1) {
        setOpened(range(1, length));
        setFail(id);
      } else if (opened.indexOf(id) === -1) {
        const siblings = getNumbersForId(id, rows, columns, bombs);
        setOpened([...opened, ...siblings, id]);
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
            number={null}
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

export default Field;