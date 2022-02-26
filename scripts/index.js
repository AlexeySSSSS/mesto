const popup = document.querySelector('.popup');
const popupImages = document.querySelector('.popup_images_card');
const popupImagesContainer = document.querySelector('.popup__container_images_card');
const popupClose = popup.querySelector('.popup__close');
const popupImagesClose = popupImages.querySelector('.popup__close_images_card');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupContainer = document.querySelector('.popup__container');
const nameInput = document.querySelector('.popup__input_type_name');
const infoInput = document.querySelector('.popup__input_type_job');
const nameContent = document.querySelector('.profile__name');
const textContent = document.querySelector('.profile__description');
const temp = document.querySelector('#temp').content;
const elements = document.querySelector('.elements');
const text = document.querySelector('.popup__input_images_name');
const link = document.querySelector('.popup__input_images_job');

const openPopup = function () {
    popup.classList.add('popup_opened');
    nameInput.value = nameContent.textContent;
    infoInput.value = textContent.textContent;
};

const closePopup = function () {
    popup.classList.remove('popup_opened');
};

const openPopupImages = function () {
    popupImages.classList.add('popup_opened');
};

const closePopupImages = function () {
    popupImages.classList.remove('popup_opened');
};

const closePupupOverlay = function (event) {
    if (event.target !== event.currentTarget) {
        return;
    }
    closePopup();
    closePopupImages();
};

function formSubmitHandler(evt) {
    evt.preventDefault();
    nameContent.textContent = nameInput.value;
    textContent.textContent = infoInput.value;
    popup.classList.remove('popup_opened');
}

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

initialCards.forEach((item) => {
    const tempClone = temp.cloneNode(true);
    tempClone.querySelector('.card__text').textContent = item.name;
    tempClone.querySelector('.card__item').src = item.link;
    tempClone.querySelector('.card__item').alt = item.name;
    elements.append(tempClone);
});

const cardDelete = document.querySelectorAll('.card__delete');
cardDelete.forEach((item) => {
    item.addEventListener('click', function () {
        const deletes = item.closest('.card');
        deletes.remove();
    });
});

const cardLike = document.querySelectorAll('.card__like');
cardLike.forEach((item) => {
    item.addEventListener('click', function () {
        item.classList.toggle('card__like_active');
    });
});

function formSubmitHandlerImage(evt) {
    evt.preventDefault();
    const tempClone = temp.cloneNode(true);
    tempClone.querySelector('.card__text').textContent = text.value;
    tempClone.querySelector('.card__item').src = link.value;
    tempClone.querySelector('.card__item').alt = text.value;
    elements.prepend(tempClone);
    popupImages.classList.remove('popup_opened');
    const cardDelete = document.querySelector('.card__delete');
    cardDelete.addEventListener('click', function () {
        const delet = cardDelete.closest('.card');
        delet.remove();
    });
    const cardLike = document.querySelector('.card__like');
    cardLike.addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__like_active');
    });
    const cardItem = document.querySelectorAll('.card__item');
    cardItem.forEach((item) => {
        item.addEventListener('click', function () {
            const big = document.querySelector('.popup_big_image');
            big.classList.add('popup_opened');
            const popupbigImages = document.querySelector('.popup__images');
            popupbigImages.src = item.src;
            const popupbigCity = document.querySelector('.popup__city');
            popupbigCity.textContent = item.alt;
        });
    });
    const popupcardClose = document.querySelector('.popup__close_big_image');
    popupcardClose.addEventListener('click', function () {
        const big = document.querySelector('.popup_big_image');
        big.classList.remove('popup_opened');
    });
}

const cardItem = document.querySelectorAll('.card__item');
cardItem.forEach((item) => {
    item.addEventListener('click', function () {
        const big = document.querySelector('.popup_big_image');
        big.classList.add('popup_opened');
        const popupbigImages = document.querySelector('.popup__images');
        popupbigImages.src = item.src;
        const popupbigCity = document.querySelector('.popup__city');
        popupbigCity.textContent = item.alt;
    });
});

const popupcardClose = document.querySelector('.popup__close_big_image');
popupcardClose.addEventListener('click', function () {
    const big = document.querySelector('.popup_big_image');
    big.classList.remove('popup_opened');
});

const popupTarget = document.querySelector('.popup_big_image');
popupTarget.addEventListener('click', function (event) {
    if (event.target !== event.currentTarget) {
        return;
    }
    popupTarget.classList.remove('popup_opened');
});


popupImagesContainer.addEventListener('submit', formSubmitHandlerImage);
profileEditButton.addEventListener('click', openPopup);
profileAddButton.addEventListener('click', openPopupImages);
popupClose.addEventListener('click', closePopup);
popupImagesClose.addEventListener('click', closePopupImages);
popup.addEventListener('click', closePupupOverlay);
popupImages.addEventListener('click', closePupupOverlay);
popupContainer.addEventListener('submit', formSubmitHandler);
