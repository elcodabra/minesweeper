import React from 'react';

const Cell = ({ number, hasBomb }) => {
  console.log('Cell');

  return (
    <span className="cell" style={{ backgroundColor: hasBomb ? 'red' : 'white', border: '1px solid gray' }}>
      {number}
    </span>
  )
}

export default Cell;