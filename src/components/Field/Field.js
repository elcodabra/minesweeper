import React from 'react';
import { useSelector } from 'react-redux';

import { selectColumns, selectIsSuccess, selectCellIds } from '../../app/reducer';

import Cell from '../Cell';
import LeftBombs from '../LeftBombs';

import './Field.css';

const Field = () => {
  const cells = useSelector(selectCellIds);
  const columns = useSelector(selectColumns);
  const success = useSelector(selectIsSuccess);

  return (
    <div className="Field">
      <LeftBombs />
      {success !== null && (
        <div className="Field-message">
          {success && (
            <p>Your win!</p>
          )}
          {!success && (
            <p>Fail!</p>
          )}
        </div>
      )}
      <div
        className="Field-container"
        style={{
          gridTemplateColumns: `repeat(${columns}, 50px [col-start])`,
          pointerEvents: success !== null ? 'none' : 'all',
        }}
      >
        {cells.map(id => <Cell key={`cell_${id}`} id={id} />)}
      </div>
    </div>
  )
}

export default Field;