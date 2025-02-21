class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteCard()
    );

    this._likeButton.addEventListener("click", () => this._handleLikeIcon());

    this._cardImage.addEventListener("click", () => this._handlePreviewClick());
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button-active");
  }

  _handlePreviewClick() {
    this._handleImageClick(this._name, this._link);
  }

  getView() {
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector(".card__image");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._cardTitle = this._element.querySelector(".card__title");
    this._cardTitle.textContent = this._name;

    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__button-delete");

    this._setEventListeners();

    return this._element;
  }
}

export default Card;
