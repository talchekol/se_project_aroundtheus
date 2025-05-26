import popup from "./Popup.js";

class PopupWithImage extends popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._imageElement = this._popupElement.querySelector(".modal__image");
    this._captionElement = this._popupElement.querySelector(".modal__caption");
  }
  open({ link, name }) {
    this._imageElement.src = link;
    this._imageElement.alt = name;
    this._captionElement.textContent = name;
    super.open();
  }
}

export default PopupWithImage;
