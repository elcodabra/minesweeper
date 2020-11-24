import { types, getRoot } from 'mobx-state-tree';

import { getNumberById, getRandomArray, getSiblingsForId, range } from '../utils';

const Cell = types
  .model({
    isBomb: false,
    isCompleted: false,
    isFailed: false,
    number: types.optional(types.union(types.number, types.literal(undefined)), undefined),
    id: types.identifierNumber,
  })
  .actions((self) => ({
    open() {
      getRoot(self).setOpened(self.id)
    },
    complete() {
      self.isCompleted = !self.isCompleted
    },
  }));

const FieldStore = types
  .model({
    isGame: false,
    rows: types.number,
    columns: types.number,
    bombsSize: types.number,
    cells: types.array(Cell),
    bombs: types.array(types.number),
  })
  .views((self) => ({
    get length() {
      return self.rows * self.columns;
    },
    get openedCount() {
      return self.cells.reduce((count, cell) => (cell.number !== undefined ? count + 1 : count), 0)
    },
    get completedCount() {
      return self.cells.reduce((count, cell) => (cell.isCompleted ? count + 1 : count), 0)
    },
    get hasFail() {
      return !!self.cells.find(cell => cell.isFailed)
    },
    get success() {
      if (self.hasFail) {
        return false;
      }
      if (self.completedCount === self.bombsSize
        && self.openedCount === self.length - self.bombsSize) {
        return true;
      }
      return null;
    }
  }))
  .actions((self) => ({
    setInitial({ rows, columns, bombsSize }) {
      self.rows = rows;
      self.columns = columns;
      self.bombsSize = bombsSize;
      self.cells = range(1, self.length).map(id => ({ id }));
      self.bombs = getRandomArray(self.length, self.bombsSize);
      self.isGame = true;
    },
    setOpened(id) {
      if (self.bombs.indexOf(id) > -1) {
        self.cells.find(cell => cell.id === id).isFailed = true;
        self.cells.forEach((cell) => {
          cell.isBomb = self.bombs.indexOf(cell.id) > -1;
          cell.number = getNumberById(cell.id + 1, self.rows, self.columns, self.bombs);
        });
      } else {
        const siblings = getSiblingsForId(id, self.rows, self.columns, self.bombs);
        self.cells.filter((cell) => siblings[cell.id] !== undefined).forEach((cell) => {
          cell.number = siblings[cell.id];
        })
      }
    },
  }))

export default FieldStore;