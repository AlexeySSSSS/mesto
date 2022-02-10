const popup = document.querySelector('.popup');
const popupClose = popup.querySelector('.popup__close');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupContainer = document.querySelector('.popup__container');

const openPopup = function () {
    popup.classList.add('popup_opened');
};

const closePopup = function () {
    popup.classList.remove('popup_opened');
};

const closePupupOverlay = function (event) {
    if (event.target !== event.currentTarget) {
        return;
    };
    closePopup();
};

function formSubmitHandler(evt) {
    evt.preventDefault();
    let name = document.querySelector('.popup__name');
    let info = document.querySelector('.popup__text');
    let nameContent = document.querySelector('.profile__name');
    let textContent = document.querySelector('.profile__description');
    nameContent.textContent = (name.value);
    textContent.textContent = (info.value);
    popup.classList.remove('popup_opened');
}

profileEditButton.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);
popup.addEventListener('click', closePupupOverlay);
popupContainer.addEventListener('submit', formSubmitHandler);


