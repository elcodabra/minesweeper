import React, { useState } from 'react';

import Cell from '../Cell';

const range = (start, stop, step = 1) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));

const BOMBS_LENGTH = 10;

// include = [1,3,4,5] exclude [4]
const getRandomNumber = (excluded, size) => {
  let random = -1;
  while (random === -1 || excluded.indexOf(random) > -1) {
    random = Math.floor(Math.random() * size);
  }
  return random;
}

const Field = () => {
  const [bombs, setBombs] = useState(null);
  console.log('Field');

  const rows = 5;
  const columns = 5;
  const length = rows * columns;

  const handleClick = (id) => {
    if (!bombs) {
      let randoms = []
      for (let i = 0; i < BOMBS_LENGTH; i++) {
        // TODO: refactor
        randoms[i] = getRandomNumber([id, ...randoms], length);
      }
      setBombs(randoms);
    } else {

    }
  }

  return (
    <div className="field" style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 50px [col-start])`, gridAutoRows: '50px' }}>
      {range(1, length).map(id => (
        <Cell key={id} hasBomb={bombs && bombs.indexOf(id) > -1} onClick={handleClick} />
      ))}
    </div>
  )
}

export default Field;