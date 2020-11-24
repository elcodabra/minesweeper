import { observer } from 'mobx-react';

import Field from './components/Field';
import NewGame from './components/NewGame';

import './App.css';

function App({ store }) {
  return (
    <div className="App">
      <header className="App-header">
        <p>Mine Sweeper</p>
        {store.isGame ? (
          <Field store={store} />
        ) : (
          <NewGame store={store} />
        )}
      </header>
    </div>
  );
}

export default observer(App);
