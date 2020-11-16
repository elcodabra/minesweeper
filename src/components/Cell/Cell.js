import React from 'react';

const Cell = ({ id }) => {
  console.log('Cell');

  return (
    <span className="cell">{id}</span>
  )
}

export default Cell;