export { openPopup, closePopup, openPopupCard };

const documentBody = document.querySelector('.body');
const popupCard = document.querySelector('.popup_big_image');
const linkPopupImage = document.querySelector('.popup__image');
const titlePopupImage = document.querySelector('.popup__city');
const buttonPopupCardClose = document.querySelector('.popup__close_big_image');

function openPopup(popup) {
    popup.classList.add('popup_opened');
    documentBody.addEventListener('keydown', сlosePopupEscapeButton);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    documentBody.removeEventListener('keydown', сlosePopupEscapeButton);
}

function сlosePopupEscapeButton(evt) {
    if (evt.key === 'Escape') {
        const popupActive = document.querySelector('.popup_opened');
        closePopup(popupActive);
    }
}

function openPopupCard(link, name) {
    linkPopupImage.src = link;
    linkPopupImage.alt = name;
    titlePopupImage.textContent = name;
    openPopup(popupCard);
}

buttonPopupCardClose.addEventListener('click', () => closePopup(popupCard));