const popup = document.querySelector('.popup');
const popupClose = popup.querySelector('.popup__close');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupContainer = document.querySelector('.popup__container');
const nameInput = document.querySelector('.popup__input_type_name');
const infoInput = document.querySelector('.popup__input_type_job');
const nameContent = document.querySelector('.profile__name');
const textContent = document.querySelector('.profile__description');

const openPopup = function () {
    popup.classList.add('popup_opened');
    nameInput.value = nameContent.textContent;
    infoInput.value = textContent.textContent;
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
    nameContent.textContent = nameInput.value;
    textContent.textContent = infoInput.value;
    popup.classList.remove('popup_opened');
}

profileEditButton.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);
popup.addEventListener('click', closePupupOverlay);
popupContainer.addEventListener('submit', formSubmitHandler);


