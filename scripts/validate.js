/*
// enabling validation by calling enableValidation()
// pass all the settings on call

//hide the input error
function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-Error`);
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
}

//show input error
function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-Error`);
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(errorClass);
}

//check form validtion and show or hide error massage
function checkInputValidity(formEl, inputEl, options) {
  if (!inputEl.validity.vaild) {
    showInputError(formEl, inputEl, options);
  } else {
    hideInputError(formEl, inputEl, options);
  }
}

//check if all input are vaild
//
const hasInvalidInput = (inputEls) => {
  return inputEls.some((input) => {
    return !input.validity.valid;
  });
};

function toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
  if (hasInvalidInput(inputEls)) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  }
}
function setEventListenrs(formEl, options) {
  const { inputSelector } = options;
  const { submitButtonSelector } = options;
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  // const submitButton = formEl.querySelector(".modal__button");
  const submitButton = formEl.querySelector(submitButtonSelector);
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputEls, submitButton, options);
    });
  });
}

function enableValidation(options) {
  const formEl = [...document.querySelectorAll(options.formSelector)];
  formEl.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListenrs(formEl, options);
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__form-input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
*/
