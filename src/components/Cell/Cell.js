import React from 'react';

import './Cell.css';
import { observer } from 'mobx-react'

const Cell = ({ cell }) => {
  const { number, isBomb, isCompleted, isFailed } = cell;
  const isOpened = number || number === 0;

  const handleClick = () => !isCompleted && !isOpened && cell.open();

  const handleRightClick = (e) => {
    e.preventDefault();
    if (!isOpened) {
      cell.complete();
    }
  }

  // console.log('Cell');

  return (
    <span
      className="Cell"
      style={{
        backgroundColor: isFailed ? 'red' : isOpened ? 'white' : 'gray',
        color: 'gray',
      }}
      onClick={handleClick}
      onContextMenu={handleRightClick}
    >
      {isOpened && isBomb ? '💣' : isCompleted && !isOpened ? '⛳' : isOpened && (number || '')}
    </span>
  )
}

export default observer(Cell);