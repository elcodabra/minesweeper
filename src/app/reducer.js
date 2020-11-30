
import {
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';

import { BOMBS, COLUMNS, ROWS } from './constants';
import { getNumberById, getRandomArray, getSiblingsForId, range } from '../utils';

import worker from '../worker';

const cellsAdapter = createEntityAdapter({
  sortComparer: (a, b) => a - b,
});

const cellsSlice = createSlice({
  name: 'cells',
  initialState: cellsAdapter.getInitialState({
    rows: ROWS,
    columns: COLUMNS,
    bombsSize: BOMBS,

    isGame: false,
    isStarted: false,
    failedCell: null,

    completed: 0,
    opened: 0,

    bombs: [],
  }),
  reducers: {
    setInitial: (state, action) => {
      const { rows, columns, bombsSize } = action.payload;
      state.rows = rows;
      state.columns = columns;
      state.bombsSize = bombsSize;

      const length = rows * columns;
      state.bombs = getRandomArray(length, state.bombsSize);
      state.isGame = true;

      const cellsList = range(1, length, 1, (_, id) => ({
        id: id + 1,
      }));
      cellsAdapter.setAll(state, cellsList);
    },
    setOpened: (state, action) => {
      const id = action.payload;

      if (state.bombs.indexOf(id) > -1) {
        state.failedCell = id;
        state.entities[id].isFailed = true;
        state.entities[id].isBomb = true;
        state.ids
          .filter(cell_id => state.entities[cell_id].number === undefined)
          .forEach((cell_id) => {
            const isBomb = state.bombs.indexOf(cell_id) > -1;
            state.entities[cell_id].isBomb = isBomb;
            if (!isBomb) {
              state.entities[cell_id].number = getNumberById(cell_id, state.rows, state.columns, state.bombs);
            } else {
              state.entities[cell_id].number = 0;
            }
          });
      } else {
        // plain object
        worker.postMessage(JSON.parse(JSON.stringify({
          id,
          rows: state.rows,
          columns: state.columns,
          bombs: state.bombs,
        })));
        /*
        const siblings = getSiblingsForId(id, state.rows, state.columns, state.bombs);
        state.ids
          .filter((cell_id) => siblings[cell_id] !== undefined)
          .forEach((cell_id) => {
            state.entities[cell_id].number = siblings[cell_id]
            if (state.entities[cell_id].isCompleted) {
              state.entities[cell_id].isComplete = false;
              state.completed -= 1;
            }
          })
         */
      }
      if (!state.isStarted) state.isStarted = true;
    },
    setNumbers: (state, action) => {
      const siblings = action.payload;
      state.ids
        .filter((cell_id) => siblings[cell_id] !== undefined && state.entities[cell_id].number === undefined)
        .forEach((cell_id) => {
          state.entities[cell_id].number = siblings[cell_id]
          state.opened += 1;
          if (state.entities[cell_id].isCompleted) {
            state.entities[cell_id].isComplete = false;
            state.completed -= 1;
          }
        })
    },
    setCompleted: (state, action) => {
      const id = action.payload;
      const current = state.entities[id];
      current.isCompleted = !current.isCompleted;
      state.completed += current.isCompleted ? 1 : -1;
    },
  },
})

export const { setInitial, setOpened, setCompleted, setNumbers } = cellsSlice.actions;

// Export the customized selectors for this adapter using `getSelectors`
export const {
  selectAll: selectAllCells,
  selectById: selectCellById,
  selectIds: selectCellIds
  // Pass in a selector that returns the posts slice of state
} = cellsAdapter.getSelectors()

export const selectIsSuccess = state => {
  if (state.failedCell) {
    return false;
  }

  if (state.completed === state.bombsSize &&
    state.opened + state.completed === state.rows * state.columns) {
    return true;
  }

  return null;
}
export const selectRows = state => state.rows;
export const selectColumns = state => state.columns;
export const selectBombs = state => state.bombs;
export const selectBombsLength = state => state.bombsSize;
export const selectBombsLeft = state => state.bombsSize - state.completed;

export const isGameSelect = state => state.isGame;

export default cellsSlice.reducer;