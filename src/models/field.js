import { types, getRoot, destroy } from 'mobx-state-tree';
import { getNumberById, getRandomArray, getSiblingsForId } from '../utils'

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
    rows: types.number,
    columns: types.number,
    bombsSize: types.number,
    cells: types.array(Cell),
    bombs: types.array(types.number),
    // filter: types.optional(filterType, SHOW_ALL)
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
    setBombs() {
      self.bombs = getRandomArray(self.length, self.bombsSize)
    },
    setOpened(id) {
      console.log('clicked=', id);
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