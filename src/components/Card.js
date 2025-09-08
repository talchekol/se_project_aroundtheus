import { data } from "autoprefixer";

class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick,
    userId
  ) {
    this._name = data.name;
    this._link = data.link;
    this._isLiked = data.isLiked;
    this._likes = data.likes || [];
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._userId = userId;
    this._id = data._id;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this);
    });

    this._likeButton.addEventListener("click", () =>
      this._handleLikeClick(this)
    );

    this._cardImage.addEventListener("click", () => this._handlePreviewClick());
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  isLiked() {
    return this._isLiked;
  }
  _handleLikeClick() {
    this._likeButton.classList.toggle("card__like-button-active");
  }

  _updateLikesView() {
    if (this.isLiked()) {
      this._likeButton.classList.add("card__like-button-active");
    } else {
      this._likeButton.classList.remove("card__like-button-active");
    }
  }

  updateLikeView(isLiked) {
    this._likeButton.classList.toggle("card__like-button-active");
    this._isLiked = isLiked;
  }

  _handlePreviewClick() {
    this._handleImageClick(this._name, this._link);
  }

  getId() {
    return this._id;
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

    this._updateLikesView();

    this._setEventListeners();

    return this._element;
  }
}

export default Card;
