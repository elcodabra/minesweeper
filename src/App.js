import { useSelector } from 'react-redux';

import { isGameSelect } from './app/reducer';

import Field from './components/Field';
import NewGame from './components/NewGame';

import './App.css';

function App() {
  const isGame = useSelector(isGameSelect);

  console.log('App');

  return (
    <div className="App">
      <header className="App-header">
        <p>Mine Sweeper</p>
        {isGame ? (
          <Field />
        ) : (
          <NewGame />
        )}
      </header>
    </div>
  );
}

export default App;
