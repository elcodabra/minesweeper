import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectBombsLength,
  selectColumns,
  selectRows,
  setInitial
} from '../../app/reducer';

const NewGame = () => {
  const rows = useSelector(selectRows);
  const columns = useSelector(selectColumns);
  const bombsSize = useSelector(selectBombsLength);
  const dispatch = useDispatch();

  const [settings, setSettings] = useState({
    rows,
    columns,
    bombsSize,
  });

  const handleChange = (e) => {
    if (e.target.name && e.target.value) {
      setSettings({ ...settings, [e.target.name]: parseInt(e.target.value.trim()) });
    }
  }

  return (
    <div>
      New Game!
      <input type="number" name="rows" value={settings.rows} onChange={handleChange} />
      <input type="number" name="columns" value={settings.columns} onChange={handleChange} />
      <input type="number" name="bombsSize" value={settings.bombsSize} onChange={handleChange} />
      <button onClick={() => dispatch(setInitial(settings))}>Go!</button>
    </div>
  );
}

export default NewGame;
