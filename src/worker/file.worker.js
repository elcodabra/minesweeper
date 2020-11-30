import { getSiblingsForId } from '../utils';

// eslint-disable-next-line no-restricted-globals
self.addEventListener("message", open);

function open(event) {
  // eslint-disable-next-line no-restricted-globals
  const { id, rows, columns, bombs } = event.data;
  this.postMessage(getSiblingsForId(id, rows, columns, bombs));
}