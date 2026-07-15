import Popup from "./Popup.js";

class PopupDeleteCard extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._form = this._popupElement.querySelector(".modal__form");
  }
  setSubmitAction(action) {
    this._handleConfirm = action;
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleConfirm();
    });
  }
}

export default PopupDeleteCard;
