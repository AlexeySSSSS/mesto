const formData = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupImageContainer = document.querySelector('.popup__form_image_card');
const formEditProfiles = document.querySelector('.popup__form_edit_profile');
const formAvatarProfiles = document.querySelector('.popup__form_avatar_image');
const avatarEditButton = document.querySelector('.profile__avatar-new');
const avatar = document.querySelector('.profile__avatar');
const nameInput = document.querySelector('.popup__input_edit_name');
const descriptionInputValue = document.querySelector('.popup__input_edit_job');

export {
    formData,
    profileEditButton,
    profileAddButton,
    popupImageContainer,
    formEditProfiles,
    nameInput,
    descriptionInputValue,
    formAvatarProfiles,
    avatarEditButton,
    avatar
};
