import React from 'react';

import Cell from '../Cell';

const range = (start, stop, step = 1) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));

const Field = () => {
  console.log('Field');

  const rows = 5;
  const columns = 5;

  return (
    <div className="field" style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 50px [col-start])` }}>
      {range(1, rows * columns).map(id => (
        <Cell key={id} id={id} />
      ))}
    </div>
  )
}

export default Field;