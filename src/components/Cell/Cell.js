import React from 'react';

const Cell = ({ id, number, isBomb, isOpened, isFailed, onClick }) => {
  console.log('Cell');

  return (
    <span
      className="cell"
      style={{ backgroundColor: isFailed ? 'red' : isOpened ? 'white' : 'gray', border: '1px solid darkgray' }}
      onClick={() => onClick(id)}>
      {isOpened && isBomb ? '💣' : number}
    </span>
  )
}

export default Cell;