import React, { useState } from 'react';
import { observer } from 'mobx-react';

const NewGame = ({ store }) => {
  const [settings, setSettings] = useState({
    rows: store.rows,
    columns: store.columns,
    bombsSize: store.bombsSize,
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
      <button onClick={() => store.setInitial(settings)}>Go!</button>
    </div>
  );
}

export default observer(NewGame);
