import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._linkPopupImage = this._popup.querySelector('.popup__image');
        this._titlePopupImage = this._popup.querySelector('.popup__city');
    }

    open(name, link) {
        this._linkPopupImage.src = link;
        this._titlePopupImage.textContent = name;
        this._linkPopupImage.alt = name;
        super.open();
    }
}