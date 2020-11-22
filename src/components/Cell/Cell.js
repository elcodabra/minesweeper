import React from 'react';

import './Cell.css';

const Cell = ({ id, number, isBomb, isCompleted, isFailed, onClick, onRightClick }) => {
  const isOpened = number || number === 0;

  const handleClick = () => !isCompleted && !isOpened && onClick(id);

  const handleRightClick = (e) => {
    e.preventDefault();
    if (!isOpened) {
      onRightClick(id);
    }
  }

  console.log('Cell');

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

export default React.memo(Cell/*, (prevProps, nextProps) => {
  return prevProps.id === nextProps.id &&
    prevProps.number === nextProps.number &&
    prevProps.isBomb === nextProps.isBomb &&
    prevProps.isFailed === nextProps.isFailed &&
    prevProps.isCompleted === nextProps.isCompleted
}*/);