class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;

    this._formEl = formElement;
  }

  _hideInputError(inputEl) {
    const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-Error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._errorClass);
  }

  _showInputError(inputEl) {
    const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-Error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }

  _hasInvalidInput(inputEls) {
    return inputEls.some((input) => {
      return !input.validity.valid;
    });
  }

  _toggleButtonState(inputEls, submitButton) {
    if (this._hasInvalidInput(inputEls)) {
      submitButton.classList.add(this._inactiveButtonClass);
      submitButton.disabled = true;
    } else {
      submitButton.classList.remove(this._inactiveButtonClass);
      submitButton.disabled = false;
    }
  }
  _setEventListeners() {
    const inputEls = [...this._formEl.querySelectorAll(this._inputSelector)];
    // const submitButton = formEl.querySelector(".modal__button");
    const submitButton = this._formEl.querySelector(this._submitButtonSelector);
    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState(inputEls, submitButton);
      });
    });
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListeners();
  }
}

const FormValidatorConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__form-input_type_error",
  errorClass: "modal__error_visible",
};

const formElement = document.querySelector(FormValidatorConfig.formSelector);
const addFormValidator = new FormValidator(FormValidatorConfig, formElement);
addFormValidator.enableValidation();
export default FormValidator;
