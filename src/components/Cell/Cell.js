import React from 'react';

const Cell = ({ id, number, hasBomb, onClick }) => {
  console.log('Cell');

  return (
    <span className="cell" style={{ backgroundColor: hasBomb ? 'red' : 'white', border: '1px solid gray' }} onClick={() => onClick(id)}>
      {number}
    </span>
  )
}

export default Cell;