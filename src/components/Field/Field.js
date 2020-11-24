import React from 'react';
import { observer } from 'mobx-react';

import Cell from '../Cell';

import './Field.css';

const Field = ({ store }) => {
  const { cells, columns } = store;

  return (
    <div className="Field">
      {store.success !== null && (
        <div className="Field-message">
          {store.success && (
            <p>Your win!</p>
          )}
          {!store.success && (
            <p>Fail!</p>
          )}
        </div>
      )}
      <div
        className="Field-container"
        style={{
          gridTemplateColumns: `repeat(${columns}, 50px [col-start])`,
          pointerEvents: store.success !== null ? 'none' : 'all',
        }}
      >
        {cells.map(cell => (
          <Cell
            key={`cell_${cell.id}`}
            cell={cell}
          />
        ))}
      </div>
    </div>
  )
}

export default observer(Field);