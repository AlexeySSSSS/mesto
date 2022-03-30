import { openPopupCard } from './index.js';
export { Card, initialCards };

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Красноярск',
        link: 'https://images.unsplash.com/photo-1571995575277-395153e7aca2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1888&q=80'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

class Card {
    constructor(name, link, cardSelector) {
        this._cardLink = link;
        this._cardName = name;
        this._cardSelector = cardSelector;
    }

    _setEventListeners() {
        this._cardImage.addEventListener('click', () => {
            openPopupCard(this._cardLink, this._cardName);
        });
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

    _handleDeleteImage(evt) {
        evt.target.closest('.card').remove();
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

