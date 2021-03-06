export default class FormValidator {
    constructor(formData, formElement) {
        this._formData = formData;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._formData.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._formData.submitButtonSelector);
    }

    _setEventListeners() {
        this.toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this.toggleButtonState();
            });
        });
    }

    _isValid(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    resetVerification() {
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
    }

    toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.setAttribute('disabled', 'disabled');
        } else {
            this._buttonElement.removeAttribute('disabled');
        }
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._formData.inputErrorClass);
        errorElement.classList.add(this._formData.errorClass);
        errorElement.textContent = errorMessage;
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._formData.inputErrorClass);
        errorElement.classList.remove(this._formData.errorClass);
        errorElement.textContent = '';
    }

    enableValidation() {
        this._setEventListeners();
    }
}