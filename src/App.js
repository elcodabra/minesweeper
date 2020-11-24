import Field from './components/Field'
import './App.css';

function App({ store }) {
  return (
    <div className="App">
      <header className="App-header">
        <p>Mine Sweeper</p>
        <Field store={store} />
      </header>
    </div>
  );
}

export default App;
