import { useSelector } from 'react-redux';

import { isGameSelect } from './app/reducer';

import Field from './components/Field';
import Settings from './components/Settings';

import './App.css';

function App() {
  const isGame = useSelector(isGameSelect);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Mine Sweeper
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
