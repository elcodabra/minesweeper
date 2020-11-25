import React from 'react';
import ReactDOM from 'react-dom';
import { getSnapshot, destroy } from 'mobx-state-tree';

import './index.css';
import App from './App';
import FieldStore from './models/field';
import reportWebVitals from './reportWebVitals';

let store;
let snapshotListener;

function createStore(snapshot) {
  // clean up snapshot listener
  if (snapshotListener) snapshotListener()
  // kill old store to prevent accidental use and run clean up hooks
  if (store) destroy(store)

  // create new one
  store = FieldStore.create(snapshot)

  return store
}

function renderApp(App, store) {
  ReactDOM.render(
    <React.StrictMode>
      <App store={store} />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

const ROWS = 50;
const COLUMNS = 50;
const BOMBS = 100;

// Initial render
renderApp(App, createStore({
  rows: ROWS,
  columns: COLUMNS,
  bombsSize: BOMBS,
}))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

if (module.hot) {
  module.hot.accept(["./models/field"], () => {
    // Store definition changed, recreate a new one from old state
    renderApp(App, createStore(getSnapshot(store)))
  })

  module.hot.accept(["./App"], () => {
    // Component definition changed, re-render app
    renderApp(App, store)
  })
}