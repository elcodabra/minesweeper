import React from 'react';

const Cell = ({ id, number, isBomb, isOpened, onClick }) => {
  console.log('Cell');

  return (
    <span
      className="cell"
      style={{ backgroundColor: isOpened && isBomb ? 'red' : isOpened ? 'white' : 'gray', border: '1px solid darkgray' }}
      onClick={() => onClick(id)}>
      {number}
    </span>
  )
}

export default Cell;