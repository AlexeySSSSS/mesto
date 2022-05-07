export default class Card {
    constructor({ item, cardSelector, userId, handleCardClick, handleDelete, handlerLikes, handlerRemoveLikes }) {
        this._cardLink = item.link;
        this._cardName = item.name;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._userCardId = item._id;
        this._cardUserId = item.owner._id;
        this._userId = userId;
        this._likes = item.likes;
        this._handleDelete = handleDelete;
        this._handlerLikes = handlerLikes;
        this._handlerRemoveLikes = handlerRemoveLikes;
    }

    _setEventListeners() {
        this._cardImage.addEventListener('click', () => this._handleCardClick());
        this._cardDelete.addEventListener('click', () => {
            this._handleDelete(this._userCardId);
        });
        this._cardLike.addEventListener('click', () => {
            if (this._cardLike.classList.contains('card__like_active')) {
                this._handlerRemoveLikes(this._userCardId);
            } else {
                this._handlerLikes(this._userCardId);
            }
        });
    }

    _getTemplate() {
        this._cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
        return this._cardElement;
    }

    deleteImage() {
        this._templateClone.remove();
        this._templateClone = null;
    }

    generateCard() {
        this._templateClone = this._getTemplate();
        this._cardImage = this._templateClone.querySelector('.card__item');
        this._cardLike = this._templateClone.querySelector('.card__like');
        this._cardLikesNumber = this._templateClone.querySelector('.card__number');
        this._cardDelete = this._templateClone.querySelector('.card__delete');
        this._hasClickDelete();
        this._isImageLiked();
        this._cardLikesNumber.textContent = this._likes.length;
        this._setEventListeners();
        this._cardImage.src = this._cardLink;
        this._cardImage.alt = this._cardName;
        this._templateClone.querySelector('.card__text').textContent = this._cardName;
        return this._templateClone;
    }

    _isImageLiked() {
        if (this._likes.some((item) => {
            return this._userId === item._id;
        })) {
            this._cardLike.classList.add('card__like_active');
        }
    }

    _hasClickDelete() {
        if (this._userId !== this._cardUserId) {
            this._cardDelete.remove();
        }
    }

    handlerCardLikes(item) {
        this._likes = item.likes;
        this._cardLikesNumber.textContent = this._likes.length;
        this._cardLike.classList.toggle('card__like_active');
    }
}