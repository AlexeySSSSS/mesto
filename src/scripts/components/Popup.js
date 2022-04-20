export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closePopupButton = this._popup.querySelector('.popup__close');
        this._сlosePopupEscapeButton = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._сlosePopupEscapeButton);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._сlosePopupEscapeButton);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._popup.addEventListener('click', (event) => {
            if (event.target !== event.currentTarget) {
                return;
            }
            this.close();
        });
        this._closePopupButton.addEventListener('click', () => {
            this.close();
        });
    }
}