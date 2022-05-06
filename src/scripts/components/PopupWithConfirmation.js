import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor({ popupSelector }) {
        super(popupSelector);
        this._formPopap = this._popup.querySelector('.popup__form');
    }

    setEventListeners() {
        super.setEventListeners();
        this._formPopap.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.sendingForm();
        });
    }

    submitForm(item) {
        this.sendingForm = item;
    }
}