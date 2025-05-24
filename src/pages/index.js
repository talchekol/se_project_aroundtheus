import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import "./index.css";
import Popup from "../components/popup.js";
import Section from "../components/section.js";
import popupWithImage from "../components/popup-with-image.js";
import PopupWithForm from "../components/popup-with-form.js";
import UserInfo from "../components/user-info.js";

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
*                         class
------------------------------------------------------------*/

/*-----------------------------------------------------------*
*                         functions
------------------------------------------------------------*/
/*
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
*/
// function rendercard(cardData, warpper) {
//   const cardElement = getCardElement(cardData);
//   warpper.prepend(cardElement);
// }

/*------------------------------------------------------------*
*                       events handlers
------------------------------------------------------------*/
// function handleProfileEditSubmit(e) {
//   e.preventDefault(e);
//   profileTitleEdit.textContent = profileTitleInput.value;
//   profileDescriptionEdit.textContent = profileDescriptionInput.value;
//   closePopup(modelProfileEditWindow);
// }

// function handleProfileAddSubmit(e) {
//   e.preventDefault(e);
//   const name = cardTitleInput.value;
//   const link = cardUrlInput.value;
//   rendercard({ name, link }, cardListEl);
//   closePopup(addCardModal);
//   e.target.reset();
// }

/*------------------------------------------------------------*
*                        events listeners
------------------------------------------------------------
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

//addNewCardButton.addEventListener("click", () => popupFormAdd.open());

addCardeModalCloseButton.addEventListener("click", () =>
  closePopup(addCardModal)
);
previewModalCloseBtn.addEventListener("click", () => {
  closePopup(previewModal);
});
*/

// validation

const FormValidatorConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__form-input_type_error",
  errorClass: "modal__error_visible",
};

const addFormValidator = new FormValidator(
  FormValidatorConfig,
  addCardFormElement
);
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(
  FormValidatorConfig,
  profileEditform
);
editFormValidator.enableValidation();

function rendercard(cardData, warpper) {
  const cardElement = getCardElement(cardData);
  warpper.prepend(cardElement);
}

function getCardElement(data) {
  const card = new Card(data, "#card-template", openImagePreview);
  return card.getView();
}

function openImagePreview(name, link) {
  // previewModalImage.src = link;
  // previewModalImage.alt = name;
  // previewModalCaption.textContent = initialCards.name;
  imagePopup.open({ name, link });
}
// section

const section = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = getCardElement(item);
    section.addItem(card);
  },

  containerSelector: ".cards__list",
});

section.renderItems();

//popup with form

const popupFormAdd = new PopupWithForm({
  popupSelector: "#profile-addcard-modal",
  handleFormSubmit: (data) => {
    const cardDataPopup = {
      name: data.title,
      link: data.description,
    };
    rendercard(cardDataPopup, cardListEl);
    popupFormAdd.close();
  },
});

addNewCardButton.addEventListener("click", () => popupFormAdd.open());

popupFormAdd.setEventListeners();

const popupFormEdit = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo({
      name: formData.title,
      job: formData.description,
    });
    popupFormEdit.close();
  },
});

const userInfo = new UserInfo({
  nameSelector: "#profile__title-js",
  jobSelector: "#profile__description-js",
});

profileEditBtn.addEventListener("click", () => {
  const { name, job } = userInfo.getUserInfo();
  profileTitleEdit.value = name;
  profileDescriptionEdit.value = job;
  popupFormEdit.open();
});

popupFormEdit.setEventListeners();

// popup with image
const imagePopup = new popupWithImage("#preview-modal");
imagePopup.setEventListeners();

profileModalCloseButton.addEventListener("click", () => popupFormEdit.close());
