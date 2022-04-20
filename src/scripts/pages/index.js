import './index.css';
import { initialCards, formData, profileEditButton, profileAddButton, popupImageContainer, formEditProfiles, nameInput, descriptionInputValue } from '../utils/Data.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

const userInfo = new UserInfo({ profileName: '.profile__name', profileDescription: '.profile__description' });

function createCard(name, link) {
    const cardImage = new Card(name, link, '#template', () => {
        popupCard.open(name, link);
    });
    return cardImage.generateCard();
}

const popupCard = new PopupWithImage('.popup_big_image');
popupCard.setEventListeners();

const cardElement = new Section({
    items: initialCards, renderer: (item) => {
        cardElement.addItem(createCard(item.name, item.link));
    }
}, '.elements');
cardElement.renderElements();

const formEditProfile = new PopupWithForm('.popup_edit_profile', (item) => {
    userInfo.setUserInfo({ profileName: item.name, profileDescription: item.info });
    formEditProfile.close();
});
formEditProfile.setEventListeners();

profileEditButton.addEventListener('click', () => {
    const InfoData = userInfo.getUserInfo();
    nameInput.value = InfoData.profileName;
    descriptionInputValue.value = InfoData.profileDescription;
    formEditProfile.open();
});

const formEditProfileValidator = new FormValidator(formData, formEditProfiles);
formEditProfileValidator.enableValidation();

const popupImage = new PopupWithForm('.popup_image_card', (item) => {
    const cardImage = createCard(item.text, item.url);
    cardElement.addItemPrepend(cardImage);
    popupImage.close();
});
popupImage.setEventListeners();

profileAddButton.addEventListener('click', () => {
    popupImageContainerValidator.toggleButtonState();
    popupImage.open();
});

const popupImageContainerValidator = new FormValidator(formData, popupImageContainer);
popupImageContainerValidator.enableValidation();







