import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setCompleted, setOpened, selectCellById } from '../../app/reducer';

import './Cell.css';

const Cell = ({ id }) => {
  const dispatch = useDispatch();
  const { number, isBomb, isCompleted, isFailed } = useSelector(state => selectCellById(state, id));
  const isOpened = number || number === 0;

  const handleClick = () => {
    if (isCompleted || isOpened) return;

    dispatch(setOpened(id));
  }

  const handleRightClick = (e) => {
    e.preventDefault();
    if (isOpened) return;

    dispatch(setCompleted(id));
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

export default React.memo(Cell);