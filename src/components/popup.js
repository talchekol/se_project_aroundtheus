class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseBtn = this._popupElement.querySelector(".modal__close");
    this._popupAddBtn = this._popupElement.querySelector(
      ".profile__add-button"
    );
    this._popupEditBtn = this._popupElement.querySelector("#profile-edit-btn");
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      //console.log("key was press");
      this.close();
    }
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keyup", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keyup", this._handleEscClose);
  }

  setEventListeners() {
    // this._popupCloseBtn.addEventListener("click", () => {
    //   this.close();
    // });
    this._popupElement.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains("modal") ||
        evt.target.classList.contains("modal__close")
      ) {
        console.log("mouse press");
        this.close();
      }
    });
  }
}
export default Popup;
