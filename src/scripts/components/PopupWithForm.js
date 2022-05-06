import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleProfileFormSubmit) {
        super(popupSelector);
        this._formPopap = this._popup.querySelector('.popup__form');
        this._inputPopup = this._formPopap.querySelectorAll('.popup__input');
        this._popupButton = this._formPopap.querySelector('.popup__button');
        this._popupButtonText = this._popupButton.textContent;
        this._handleProfileFormSubmit = handleProfileFormSubmit;
    }

    _getInputValues() {
        this._inputFields = {};
        this._inputPopup.forEach((item) => {
            this._inputFields[item.name] = item.value;
        });
        return this._inputFields;
    }

    setEventListeners() {
        super.setEventListeners();
        this._formPopap.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleProfileFormSubmit(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._formPopap.reset();
    }

    messageLoading(item) {
        if (item === true) {
            this._popupButton.textContent = 'Сохранение...';
        } else {
            this._popupButton.textContent = this._popupButtonText;
        }
    }
}