const previewModal = document.querySelector("#preview-modal");
const previewModalImage = previewModal.querySelector(".modal__image");
const previewModalCaption = previewModal.querySelector(".modal__caption");
const previewModalCloseBtn = previewModal.querySelector(
  ".modal__close-preview"
);

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalEsc);
  modal.removeEventListener("mousedown", closeModalOverlay);
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalEsc);
  modal.addEventListener("mousedown", closeModalOverlay);
}

function closeModalOverlay(e) {
  if (e.target.classList.contains("modal")) {
    closePopup(e.target);
  }
}

function closeModalEsc(evt) {
  if (evt.key === "Escape") {
    const modalOpened = document.querySelector(".modal_opened");
    if (modalOpened) {
      closePopup(modalOpened);
    }
  }
}

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__button-delete")
      .addEventListener("click", () => this._handleDeleteCard());

    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => this._handleLikeIcon());

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => this._handlePreviewCard());
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handleLikeIcon() {
    this._element
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button-active");
  }

  _handlePreviewCard() {
    previewModalImage.src = this._link;
    previewModalCaption.textContent = this._name;
    previewModalImage.alt = this._name;
    openPopup(previewModal);
  }

  getView() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__title").textContent = this._name;

    return this._element;
  }
}

export default Card;
