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
const template = document.querySelector('#template').content;
const elements = document.querySelector('.elements');
const cardNameInputValue = document.querySelector('.popup__input_image_name');
const cardLinkInputValue = document.querySelector('.popup__input_image_job');
const buttonPopupCardClose = document.querySelector('.popup__close_big_image');
const popupCard = document.querySelector('.popup_big_image');

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

const closePopupEditProfile = function () {
    closePopup(popupEditProfile);
};

const openPopupImage = function () {
    openPopup(popupImage);
};

const closePopupImage = function () {
    closePopup(popupImage);
};

const closePopupCard = function () {
    closePopup(popupCard);
};

function ClosePopupEscapeButton(evt) {
    if (evt.key === 'Escape') {
        const allPopup = document.querySelectorAll('.popup');
        allPopup.forEach((evt) => {
            closePopup(evt);
        });
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

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInputValue.value;
    closePopup(popupEditProfile);
}

function createCard(name, link) {
    const templateClone = template.cloneNode(true);
    templateClone.querySelector('.card__text').textContent = name;
    const cardImage = templateClone.querySelector('.card__item');
    cardImage.src = link;
    cardImage.alt = name;
    cardImage.addEventListener('click', function (evt) {
        const linkPopupImage = document.querySelector('.popup__image');
        linkPopupImage.src = evt.target.src;
        linkPopupImage.alt = evt.target.alt;
        const titlePopupImage = document.querySelector('.popup__city');
        titlePopupImage.textContent = evt.target.alt;
        openPopup(popupCard);
    });
    templateClone.querySelector('.card__delete').addEventListener('click', function (evt) {
        evt.target.closest('.card').remove();
    });
    templateClone.querySelector('.card__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__like_active');
    });
    return templateClone;
}

initialCards.forEach((item) => {
    elements.append(createCard(item.name, item.link));
});

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    elements.prepend(createCard(cardNameInputValue.value, cardLinkInputValue.value));
    closePopup(popupImage);
}

popupImageContainer.addEventListener('submit', handleCardFormSubmit);
profileEditButton.addEventListener('click', openPopupEditProfile);
profileAddButton.addEventListener('click', openPopupImage);
buttonEditProfileClose.addEventListener('click', closePopupEditProfile);
popupImageClose.addEventListener('click', closePopupImage);
formEditProfile.addEventListener('submit', handleProfileFormSubmit);
buttonPopupCardClose.addEventListener('click', closePopupCard);