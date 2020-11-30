import React from 'react';
import cx from 'classnames';
import { useSelector, useDispatch } from 'react-redux';

import { setCompleted, setOpened, selectCellById, selectBombsLeft } from '../../app/reducer';

import './Cell.css';

const Cell = ({ id }) => {
  const dispatch = useDispatch();
  const left = useSelector(selectBombsLeft);
  const { number, isBomb, isCompleted, isFailed } = useSelector(state => selectCellById(state, id));
  const isOpened = number || number === 0;

  const handleClick = () => {
    if (isCompleted || isOpened) return;

    dispatch(setOpened(id));
  }

  const handleRightClick = (e) => {
    e.preventDefault();
    if (isOpened || !left) return;

    dispatch(setCompleted(id));
  }

  // console.log('Cell');

  return (
    <span
      className={cx('Cell', { 'Cell--opened': isOpened }, { 'Cell--failed': isFailed })}
      onClick={handleClick}
      onContextMenu={handleRightClick}
    >
      {isOpened && isBomb ? '💣' : isCompleted && !isOpened ? '⛳' : isOpened && (number || '')}
    </span>
  )
}

export default React.memo(Cell);