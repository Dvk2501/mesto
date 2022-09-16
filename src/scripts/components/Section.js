export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
    this._items = items;
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems(data) {
    data.forEach((item) => {
      this._renderer(item);
    });
  }
}
