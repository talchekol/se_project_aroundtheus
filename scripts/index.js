const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/*-------------------------------------------------------------*
 *                        elements
 --------------------------------------------------------------*/

const profileEditBtn = document.querySelector("#profile-edit-btn");
const modelProfileEditWindow = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#profile-addcard-modal");
const profileModalCloseButton =
  modelProfileEditWindow.querySelector(".modal__close");
const addCardeModalCloseButton = addCardModal.querySelector(".modal__close");
const profileTitleEdit = document.querySelector("#profile__title-js");
const profileDescriptionEdit = document.querySelector(
  "#profile__description-js"
);
const profileTitleInput = document.querySelector("#profile__Title-Input");
const profileDescriptionInput = document.querySelector(
  "#profile__Description-Input"
);
const profileEditform = modelProfileEditWindow.querySelector(
  "#profile__edit-form"
);
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".cards__list");
const addNewCardButton = document.querySelector(".profile__add-button");
const addCardFormElement = document.querySelector("#profile-addcard-modal");
const cardTitleInput = document.querySelector("#profile__addTitle-Input");
const cardUrlInput = document.querySelector("#profile__url-Input");
const previewModal = document.querySelector("#preview-modal");
const previewModalImage = previewModal.querySelector(".modal__image");
const previewModalCaption = previewModal.querySelector(".modal__caption");
const previewModalCloseBtn = previewModal.querySelector(
  ".modal__close-preview"
);

/*-----------------------------------------------------------*
*                         functions
------------------------------------------------------------*/

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

function rendercard(cardData, warpper) {
  const cardElement = getCardElement(cardData);
  warpper.prepend(cardElement);
}

function getCardElement(cardData) {
  //clone the template element with all its content and store it in a cardElement variable
  const cardElement = cardTemplate.cloneNode(true);

  //access the card title and image and store them in variables
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteEl = cardElement.querySelector(".card__button-delete");

  //set the card title to the name field of the object, too
  cardTitleEl.textContent = cardData.name;
  //set the path to the image to the link field of the object
  cardImageEl.src = cardData.link;

  //set the image alt text to the name field of the object
  cardImageEl.alt = cardData.name;
  //return the ready HTML element with the filled-in data

  //set remove button
  cardDeleteEl.addEventListener("click", (event) => {
    event.target.closest(".card").remove();
    //*event.target.closest('.card').remove() inside the event handler. This way, it will find and remove the closest parent .card element when the trash button is clicked.*
  });

  // set like buttons change color
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button-active");
  });

  cardImageEl.addEventListener("click", () => {
    openPopup(previewModal);
    //src
    previewModalImage.src = cardData.link;
    //caption
    previewModalCaption.textContent = cardData.name;
    //alt
    previewModalImage.alt = cardData.textContent;
  });

  return cardElement;
}

/*------------------------------------------------------------*
*                       events handlers
------------------------------------------------------------*/
function handleProfileEditSubmit(e) {
  e.preventDefault(e);
  profileTitleEdit.textContent = profileTitleInput.value;
  profileDescriptionEdit.textContent = profileDescriptionInput.value;
  closePopup(modelProfileEditWindow);
}

function handleProfileAddSubmit(e) {
  e.preventDefault(e);
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  rendercard({ name, link }, cardListEl);
  closePopup(addCardModal);
  e.target.reset();
}

/*------------------------------------------------------------*
*                        events listeners
------------------------------------------------------------*/
profileEditBtn.addEventListener("click", () => {
  profileTitleInput.value = profileTitleEdit.textContent.trim();
  profileDescriptionInput.value = profileDescriptionEdit.textContent.trim();
  // modelProfileEditWindow.classList.add("modal_opened");
  openPopup(modelProfileEditWindow);
});

profileModalCloseButton.addEventListener("click", () =>
  closePopup(modelProfileEditWindow)
);

profileEditform.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleProfileAddSubmit);

initialCards.forEach((cardData) => rendercard(cardData, cardListEl));

addNewCardButton.addEventListener("click", () => openPopup(addCardModal));
addCardeModalCloseButton.addEventListener("click", () =>
  closePopup(addCardModal)
);

previewModalCloseBtn.addEventListener("click", () => {
  closePopup(previewModal);
});
