import { getSiblingsForId } from '../utils';

// eslint-disable-next-line no-restricted-globals
self.addEventListener("message", open);

function open(event) {
  // eslint-disable-next-line no-restricted-globals
  const { id, rows, columns, bombs } = event.data;
  console.log(id);
  // setInterval(() => this.postMessage(initial++), 1000);
  getSiblingsForId(id, rows, columns, bombs, {}, (siblings) => {
    // setTimeout(() => this.postMessage(siblings), 50)
    this.postMessage(siblings)
  });
}