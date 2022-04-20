export default class Card {
    constructor(name, link, cardSelector, handleCardClick) {
        this._cardLink = link;
        this._cardName = name;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    _setEventListeners() {
        this._cardImage.addEventListener('click', () => this._handleCardClick());
        this._templateClone.querySelector('.card__delete').addEventListener('click', (evt) => {
            this._handleDeleteImage(evt);
        });
        this._templateClone.querySelector('.card__like').addEventListener('click', (evt) => {
            this._handleLikeImage(evt);
        });
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
        return cardElement;
    }

    _handleLikeImage(evt) {
        evt.target.classList.toggle('card__like_active');
    }

    _handleDeleteImage() {
        this._templateClone.remove();
        this._templateClone = null;
    }

    generateCard() {
        this._templateClone = this._getTemplate();
        this._cardImage = this._templateClone.querySelector('.card__item');
        this._setEventListeners();
        this._cardImage.src = this._cardLink;
        this._cardImage.alt = this._cardName;
        this._templateClone.querySelector('.card__text').textContent = this._cardName;
        return this._templateClone;
    }
}