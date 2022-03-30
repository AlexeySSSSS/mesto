import { Card, initialCards } from './Card.js';
import { FormValidator, formData } from './FormValidator.js';
export { openPopupCard };

const documentBody = document.querySelector('.body');
const modalPopups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_edit_profile');
const popupImage = document.querySelector('.popup_image_card');
const popupImageContainer = document.querySelector('.popup__form_image_card');
const buttonEditProfileClose = popupEditProfile.querySelector('.popup__close_edit_profile');
const popupImageClose = popupImage.querySelector('.popup__close_image_card');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const formEditProfile = document.querySelector('.popup__form_edit_profile');
const nameInput = document.querySelector('.popup__input_edit_name');
const descriptionInputValue = document.querySelector('.popup__input_edit_job');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const elements = document.querySelector('.elements');
const cardNameInputValue = document.querySelector('.popup__input_image_name');
const cardLinkInputValue = document.querySelector('.popup__input_image_job');
const buttonPopupCardClose = document.querySelector('.popup__close_big_image');
const popupCard = document.querySelector('.popup_big_image');
const linkPopupImage = document.querySelector('.popup__image');
const titlePopupImage = document.querySelector('.popup__city');

const popupImageContainerValidator = new FormValidator(formData, popupImageContainer);
popupImageContainerValidator.enableValidation();
const formEditProfileValidator = new FormValidator(formData, formEditProfile);
formEditProfileValidator.enableValidation();

function openPopup(popup) {
    popup.classList.add('popup_opened');
    documentBody.addEventListener('keydown', ClosePopupEscapeButton);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    documentBody.removeEventListener('keydown', ClosePopupEscapeButton);
}

const openPopupEditProfile = function () {
    nameInput.value = profileName.textContent;
    descriptionInputValue.value = profileDescription.textContent;
    openPopup(popupEditProfile);
};

function ClosePopupEscapeButton(evt) {
    if (evt.key === 'Escape') {
        const popupActive = document.querySelector('.popup_opened');
        closePopup(popupActive);
    }
}

modalPopups.forEach((evt) => {
    evt.addEventListener('click', function (event) {
        if (event.target !== event.currentTarget) {
            return;
        }
        closePopup(evt);
    });
});

function openPopupCard(link, name) {
    linkPopupImage.src = link;
    linkPopupImage.alt = name;
    titlePopupImage.textContent = name;
    openPopup(popupCard);
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInputValue.value;
    closePopup(popupEditProfile);
}

function createCard(name, link) {
    const cardImage = new Card(name, link, '#template');
    return cardImage.generateCard();
}

initialCards.forEach((item) => {
    elements.append(createCard(item.name, item.link));
});

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    elements.prepend(createCard(cardNameInputValue.value, cardLinkInputValue.value));
    popupImageContainer.reset();
    popupImageContainerValidator.toggleButtonState();
    closePopup(popupImage);
}

popupImageContainer.addEventListener('submit', handleCardFormSubmit);
profileEditButton.addEventListener('click', openPopupEditProfile);
profileAddButton.addEventListener('click', () => openPopup(popupImage));
buttonEditProfileClose.addEventListener('click', () => closePopup(popupEditProfile));
popupImageClose.addEventListener('click', () => closePopup(popupImage));
formEditProfile.addEventListener('submit', handleProfileFormSubmit);
buttonPopupCardClose.addEventListener('click', () => closePopup(popupCard));