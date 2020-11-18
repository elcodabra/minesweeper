import React from 'react';

import './Cell.css';

const Cell = ({ id, number, isBomb, isCompleted, isOpened, isFailed, onClick, onRightClick }) => {
  console.log('Cell');

  return (
    <span
      className="Cell"
      style={{ backgroundColor: isFailed ? 'red' : isOpened ? 'white' : 'gray' }}
      onClick={() => !isCompleted && onClick(id)}
      onContextMenu={(e) => {
        e.preventDefault();
        onRightClick(id);
      }}
    >
      {isOpened && isBomb ? '💣' : isCompleted && !isOpened ? '⛳' : number}
    </span>
  )
}

export default Cell;