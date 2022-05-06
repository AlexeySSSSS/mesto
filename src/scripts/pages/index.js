import './index.css';
import {
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
} from '../utils/Data.js';
import Api from '../components/Api.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-40',
    headers: {
        authorization: '987b56da-64a8-4aef-b87c-689882054ee4',
        'Content-Type': 'application/json'
    }
});

api.getData().then(([initialCards, userData]) => {
    userInfo.setUserInfo(userData);
    userInfo.saveId(userData);
    cardElement.renderElements(initialCards);
})
    .catch((err) => {
        console.log(`Ошибка: ${err}`);
    });

const userInfo = new UserInfo({
    profileName: '.profile__name',
    profileDescription: '.profile__description',
    profileAvatar: '.profile__avatar'
});

function createCard(item) {
    const cardImage = new Card({
        item: item,
        cardSelector: '#template',
        userId: userInfo.returnId(),
        handleCardClick: () => {
            popupCard.open(item.name, item.link);
        },
        handleDelete: (userCardId) => {
            popupDeleteImage.open();
            popupDeleteImage.submitForm(() => {
                api.deleteImageCard(userCardId)
                    .then(() => {
                        popupDeleteImage.close();
                        cardImage.DeleteImage();
                    })
                    .catch((err) => {
                        console.log(`Ошибка: ${err}`);
                    });
            });
        },
        handlerLikes: (userCardId) => {
            api.likesImage(userCardId)
                .then((item) => {
                    cardImage.handlerCardLikes(item);
                })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`);
                });
        },
        handlerRemoveLikes: (userCardId) => {
            api.deleteLikes(userCardId)
                .then((item) => {
                    cardImage.handlerCardLikes(item);
                })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`);
                });
        }
    });
    return cardImage.generateCard();
}

const popupCard = new PopupWithImage('.popup_big_image');
popupCard.setEventListeners();

const cardElement = new Section({
    renderer: (item) => {
        cardElement.addItem(createCard(item));
    }
}, '.elements');

const formEditProfile = new PopupWithForm('.popup_edit_profile', (item) => {
    formEditProfile.messageLoading(true);
    api.changeUserinformation(item)
        .then((item) => {
            userInfo.setUserInfo(item);
            formEditProfile.close();
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
            formEditProfile.messageLoading(false);
        });
}
);
formEditProfile.setEventListeners();

profileEditButton.addEventListener('click', () => {
    const InfoData = userInfo.getUserInfo();
    nameInput.value = InfoData.profileName;
    descriptionInputValue.value = InfoData.profileDescription;
    formEditProfileValidator.resetVerification();
    formEditProfileValidator.toggleButtonState();
    formEditProfile.open();
});

const formEditProfileValidator = new FormValidator(formData, formEditProfiles);
formEditProfileValidator.enableValidation();

const formAvatarProfile = new PopupWithForm('.popup_avatar_image', (item) => {
    formAvatarProfile.messageLoading(true);
    api.changeAvatar(item)
        .then((item) => {
            avatar.src = item.avatar;
            formAvatarProfile.close();
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
            formAvatarProfile.messageLoading(false);
        });
});
formAvatarProfile.setEventListeners();

avatarEditButton.addEventListener('click', () => {
    popupAvatarValidator.resetVerification();
    popupAvatarValidator.toggleButtonState();
    formAvatarProfile.open();
});

const popupAvatarValidator = new FormValidator(formData, formAvatarProfiles);
popupAvatarValidator.enableValidation();

const popupImage = new PopupWithForm('.popup_image_card', (item) => {
    popupImage.messageLoading(true);
    api.newImageCard(item)
        .then((item) => {
            cardElement.addItemPrepend(createCard(item));
            popupImage.close();
        })
        .catch((err) => {
            console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
            popupImage.messageLoading(false);
        });
});
popupImage.setEventListeners();

profileAddButton.addEventListener('click', () => {
    popupImageContainerValidator.resetVerification();
    popupImageContainerValidator.toggleButtonState();
    popupImage.open();
});

const popupImageContainerValidator = new FormValidator(formData, popupImageContainer);
popupImageContainerValidator.enableValidation();

const popupDeleteImage = new PopupWithConfirmation({
    popupSelector: '.popup_delete_image'
});
popupDeleteImage.setEventListeners();