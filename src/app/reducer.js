
import {
  createSlice,
  createEntityAdapter,
  createSelector
} from '@reduxjs/toolkit'

import { BOMBS, COLUMNS, ROWS } from './constants';
import { getNumberById, getRandomArray, getSiblingsForId, range } from '../utils';

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

    bombs: [], // TODO: bombs?? || bombs = {}
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
        state.ids
          .filter(cell_id => state.entities[cell_id].number === undefined)
          .forEach((cell_id) => {
          state.entities[cell_id].isBomb = state.bombs.indexOf(cell_id) > -1;
          state.entities[cell_id].number = getNumberById(cell_id, state.rows, state.columns, state.bombs);
        });
      } else {
        const siblings = getSiblingsForId(id, state.rows, state.columns, state.bombs);
        state.ids
          .filter((cell_id) => siblings[cell_id] !== undefined)
          .forEach((cell_id) => {
          state.entities[cell_id].number = siblings[cell_id];
        })
      }
      if (!state.isStarted) state.isStarted = true;
    },
    setCompleted: (state, action) => {
      const id = action.payload;
      const current = state.entities[id];
      current.isCompleted = !current.isCompleted;
    },
  },
})

export const { setInitial, setOpened, setCompleted } = cellsSlice.actions;

// Export the customized selectors for this adapter using `getSelectors`
export const {
  selectAll: selectAllCells,
  selectById: selectCellById,
  selectIds: selectCellIds
  // Pass in a selector that returns the posts slice of state
} = cellsAdapter.getSelectors()

export const selectSuccess = state => null;
export const selectRows = state => state.rows;
export const selectColumns = state => state.columns;
export const selectBombsLength = state => state.bombsSize;

export const isGameSelect = state => state.isGame;

export default cellsSlice.reducer;