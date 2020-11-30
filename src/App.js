import React from 'react';
import { useSelector } from 'react-redux';

import { isGameSelect } from './app/reducer';

import Field from './components/Field';
import Settings from './components/Settings';
import NewGame from './components/NewGame';

import './App.css';

function App() {
  const isGame = useSelector(isGameSelect);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Mine Sweeper
          <NewGame />
        </p>
        {isGame ? (
          <Field />
        ) : (
          <Settings />
        )}
      </header>
    </div>
  );
}

export default App;
