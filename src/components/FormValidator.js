//Валидация форм

export default class FormValidator {
  constructor(config, formElement) {
    this._form = formElement;
    this._inputSelector = config.inputSelector;
    this._inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    this._submitButtonSelector = config.submitButtonSelector;
    this._submitButton = formElement.querySelector(this._submitButtonSelector);
    
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;    
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(
      `.${inputElement.id}-error`
    );

    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(
      `.${inputElement.id}-error`
    );

    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _hideError() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  _checkInputValidity(inputElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return (
        !inputElement.validity.valid || inputElement.validity.patternMismatch
      );
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.setAttribute("disabled", "");
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.removeAttribute("disabled");
    }
  }

  _setEventListeners() {    
    this._toggleButtonState(); 

    this._form.addEventListener("reset", () => {
      setTimeout(() => {
        this._toggleButtonState();
        this._hideError(); 
      }, 0);
    });
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {   
    this._setEventListeners();    
  }
}
