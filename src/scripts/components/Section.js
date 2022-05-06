export default class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._containerSelector = document.querySelector(containerSelector);
    }

    renderElements(items) {
        items.forEach((item) => this._renderer(item));
    }

    addItem(item) {
        this._containerSelector.append(item);
    }

    addItemPrepend(item) {
        this._containerSelector.prepend(item);
    }
}