import React from 'react';

const Cell = ({ id, number, isBomb, isCompleted, isOpened, isFailed, onClick, onRightClick }) => {
  console.log('Cell');

  return (
    <span
      className="cell"
      style={{ backgroundColor: isFailed ? 'red' : isOpened ? 'white' : 'gray', border: '1px solid darkgray' }}
      onClick={() => !isCompleted && onClick(id)}
      onContextMenu={() => onRightClick(id)}
    >
      {isOpened && isBomb ? '💣' : isCompleted ? '✅' : number}
    </span>
  )
}

export default Cell;