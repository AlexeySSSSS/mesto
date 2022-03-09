const formData = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

function enableValidation(formClass) {
    const formList = Array.from(document.querySelectorAll(formClass.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, formData);
    });
}

const setEventListeners = (formElement, formClass) => {
    const inputList = Array.from(formElement.querySelectorAll(formClass.inputSelector));
    const buttonElement = formElement.querySelector(formClass.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, formData);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement);
            toggleButtonState(inputList, buttonElement, formData);
        });
    });
};

const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, formData);
    } else {
        hideInputError(formElement, inputElement, formData);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement, formClass) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(formClass.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(formClass.inactiveButtonClass);
        buttonElement.disabled = false;
    }
};

const showInputError = (formElement, inputElement, errorMessage, formClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(formClass.inputErrorClass);
    errorElement.classList.add(formClass.errorClass);
    errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, formClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(formClass.inputErrorClass);
    errorElement.classList.remove(formClass.errorClass);
    errorElement.textContent = '';
};

enableValidation(formData);