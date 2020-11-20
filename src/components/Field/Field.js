import React, { useState } from 'react';

import Cell from '../Cell';

import './Field.css';

const range = (start, stop, step = 1) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));

const getRandomNumber = (excluded, size) => {
  let random = 0;
  while (!random || excluded.indexOf(random) > -1) {
    random = Math.floor(Math.random() * size);
  }
  return random;
}

const getRandomArray = (length, bombsSize) => {
  let randoms = [];
  for (let i = 0; i < bombsSize; i++) {
    // TODO: hide bomb number & add compare fn for num
    randoms[i] = getRandomNumber(randoms, length);
  }
  return randoms;
}

const getSiblings = (num, rows, columns) => {
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

const Field = ({ rows = 50, columns = 50, bombsSize = 100 }) => {
  const length = rows * columns;

  const [bombs, setBombs] = useState(getRandomArray(length, bombsSize));
  const [opened, setOpened] = useState({});
  const [completed, setCompleted] = useState([]);
  const [fail, setFail] = useState(null);

  const cells = React.useMemo(() => range(1, length), [length]);

  const handleClick = (id) => {
    if (bombs.indexOf(id) > -1) {
      setOpened(cells.reduce((acc, cur) => ({ ...acc, [cur]: getNumberById(cur + 1, rows, columns, bombs) }), {}));
      setFail(id);
    } else if (!opened[id]) {
      const siblings = getSiblingsForId(id, rows, columns, bombs);
      setOpened({
        ...opened,
        ...siblings,
      });
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

  const isSuccess = completed.length === bombsSize && Object.keys(opened).length === length - bombsSize;
  const isFail = fail !== null;

  console.log('Field');
  console.log('completed:', completed.length);
  console.log('opened:', Object.keys(opened).length);
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
      <div
        className="Field-container"
        style={{
          gridTemplateColumns: `repeat(${columns}, 50px [col-start])`,
          pointerEvents: isSuccess || isFail ? 'none' : 'all',
        }}
      >
        {cells.map(id => (
          <Cell
            id={id}
            key={`cell_${id}`}
            number={opened[id]}
            isCompleted={completed.indexOf(id) > -1}
            isBomb={bombs && bombs.indexOf(id) > -1} // TODO: refactor
            isFailed={fail === id} // TODO: remove
            onClick={handleClick}
            onRightClick={handleRightClick}
          />
        ))}
      </div>
    </div>
  )
}

export default React.memo(Field);