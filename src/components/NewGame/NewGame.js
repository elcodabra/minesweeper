import React from 'react';
import { useDispatch } from 'react-redux';

import {
  setNewGame,
} from '../../app/reducer';

const NewGame = () => {
  const dispatch = useDispatch();

  return (
    <span style={{ cursor: 'pointer', paddingLeft: 20 }} onClick={() => dispatch(setNewGame())}>😊</span>
  );
}

export default NewGame;
