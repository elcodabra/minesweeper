import React from 'react';
import { useSelector } from 'react-redux';

import {
  selectBombsLeft
} from '../../app/reducer';

const LeftBombs = () => {
  const left = useSelector(selectBombsLeft);

  return (
    <p>Left bombs: {left}</p>
  );
}

export default LeftBombs;
