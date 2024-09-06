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

const profileEditBtb = document.querySelector("#profile-edit-btn");
const modelProfileEditWindow = document.querySelector("#profile-edit-model");
const modelCloseEdit = document.querySelector("#model-close-edit");
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
/*-----------------------------------------------------------*
 *                         functions
 ------------------------------------------------------------*/
function closePopop() {
  modelProfileEditWindow.classList.remove("model__opened");
}

function getCardElement(cardData) {
  //clone the template element with all its content and store it in a cardElement variable
  const cardElement = cardTemplate.cloneNode(true);

  //access the card title and image and store them in variables
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");

  //set the card title to the name field of the object, too
  cardTitleEl.textContent = cardData.name;
  //set the path to the image to the link field of the object
  cardImageEl.src = cardData.link;

  //set the image alt text to the name field of the object
  cardImageEl.textContent = cardData.name;
  //return the ready HTML element with the filled-in data
  return cardElement;
}

/*------------------------------------------------------------*
 *                       events handlers
 ------------------------------------------------------------*/
function handleProfileEditsubmit(e) {
  e.preventDefault(e);
  profileTitleEdit.textContent = profileTitleInput.value;
  profileDescriptionEdit.textContent = profileDescriptionInput.value;
  closePopop();
}

/*------------------------------------------------------------*
 *                        events listeners
 ------------------------------------------------------------*/
profileEditBtb.addEventListener("click", () => {
  profileTitleInput.value = profileTitleEdit.textContent.trim();
  profileDescriptionInput.value = profileDescriptionEdit.textContent.trim();
  modelProfileEditWindow.classList.add("model__opened");
});

modelCloseEdit.addEventListener("click", () => {
  closePopop();
});

profileEditform.addEventListener("submit", handleProfileEditsubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);

  cardListEl.append(cardElement);
});
