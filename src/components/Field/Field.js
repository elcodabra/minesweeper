import React, { useState } from 'react';

import { getNumberById, getRandomArray, getSiblingsForId, range } from '../../utils';
import Cell from '../Cell';

import './Field.css';

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

export default Field;