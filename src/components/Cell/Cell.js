import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setCompleted, setOpened, setNumbers, selectCellById, selectBombs, selectColumns, selectRows } from '../../app/reducer';
import { getSiblingsForId } from '../../utils'

import './Cell.css';

const Cell = ({ id }) => {
  const dispatch = useDispatch();
  const { number, isBomb, isCompleted, isFailed } = useSelector(state => selectCellById(state, id));
  /*
  const rows = useSelector(selectRows);
  const columns = useSelector(selectColumns);
  const bombs = useSelector(selectBombs);
  */
  const isOpened = number || number === 0;

  const handleClick = () => {
    if (isCompleted || isOpened) return;

    /*
    getSiblingsForId(id, rows, columns, bombs.reduce((acc, id) => ({ ...acc, [id]: true }), {}), {}, siblings => {
      setTimeout(() => dispatch(setNumbers(siblings)), 50)
    });
    */

    dispatch(setOpened(id));
  }

  const handleRightClick = (e) => {
    e.preventDefault();
    if (!isOpened) {
      dispatch(setCompleted(id));
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

export default React.memo(Cell);