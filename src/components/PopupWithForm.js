import Popup from "./Popup.js";
class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector(".modal__form");
    this._inputList = this._form.querySelectorAll(".modal__form-input");
    this._submitButton = this._form.querySelector(".modal__button");
    this._submitButtonDefaultText = this._submitButton.textContent;
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonDefaultText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this.renderLoading(true);
      this._handleFormSubmit(inputValues)
        .then(() => {
          this._form.reset();
          this.close();
        })
        .catch((err) => {
          console.error("Error submitting form:", err);
        })
        .finally(() => {
          this.renderLoading(false);
        });
    });
  }
}

export default PopupWithForm;
