import { initialCards, formValidatorConfig } from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import "./index.css";
import Popup from "../components/Popup.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupDeleteCard from "../components/PopupDeleteCard.js";

/*-------------------------------------------------------------*
 *                        elements
 --------------------------------------------------------------*/

const profileEditBtn = document.querySelector("#profile-edit-btn");
const modelProfileEditWindow = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#profile-addcard-modal");
const deleteCardModal = document.querySelector("#confirm-delete-modal");
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
const inputName = document.querySelector("#profile__Title-Input");
const inputDescription = document.querySelector("#profile__Description-Input");
const deleteCardButton = document.querySelector(".card__button-delete");
const avatarForm = document.querySelector("#avatar-img-form");
const avatarInput = document.querySelector("#avatar-link-input");
const profileImage = document.querySelector(".profile__image");
const avatarModal = document.querySelector("#profile-avatar-modal");
const avatarEditBtn = document.querySelector("#avatar-edit-btn");

const addFormValidator = new FormValidator(
  formValidatorConfig,
  addCardFormElement
);
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(
  formValidatorConfig,
  profileEditform
);
editFormValidator.enableValidation();

//cards
function renderCard(item, sectionIntance) {
  const cardElement = createCard(item);
  sectionIntance.addItem(cardElement);
}

//popup delete card
const PopupConfirmDelete = new PopupDeleteCard({
  popupSelector: "#confirm-delete-modal",
});

PopupConfirmDelete.setEventListeners();
//יצירת כרטיס
function createCard(data) {
  const card = new Card(
    data,
    "#card-template",
    openImagePreview,
    (cardInstance) => {
      PopupConfirmDelete.open();
      PopupConfirmDelete.setSubmitAction(() => {
        api
          .deleteCard(cardInstance.getId())
          .then(() => {
            cardInstance.deleteCard();
            PopupConfirmDelete.close();
          })
          .catch((err) => {
            console.error("error in delete card:", err);
          });
      });
    },
    (cardInstance) => {
      if (cardInstance.isLiked()) {
        api
          .removeLike(cardInstance.getId())
          .then((updatedCard) => {
            console.log("🔥 response from like API:", updatedCard);
            cardInstance.updateLikeView(updatedCard.isLiked);
          })
          .catch((err) => console.error("Error removing like:", err));
      } else {
        api
          .addLike(cardInstance.getId())
          .then((updatedCard) => {
            console.log("🔥 response from like API:", updatedCard);
            cardInstance.updateLikeView(updatedCard.isLiked);
          })
          .catch((err) => console.error("Error adding like:", err));
      }
      userInfo.getUserId();
    }
  );
  return card.getView();
}

//פתיחת כרטיס
function openImagePreview(name, link) {
  imagePopup.open({ name, link });
}
// section
const section = new Section({
  items: [],
  renderer: (item) => renderCard(item, section),
  containerSelector: ".cards__list",
});

section.renderItems();

//popup with form
const popupFormAdd = new PopupWithForm({
  popupSelector: "#profile-addcard-modal",
  handleFormSubmit: (data) => {
    popupFormAdd.renderLoading(true);
    const cardDataPopup = {
      name: data.title,
      link: data.description,
    };

    api
      .addNewCard(cardDataPopup)
      .then((newCard) => {
        renderCard(newCard, section);
        popupFormAdd.close();
      })
      .catch((err) => {
        console.error("Error adding card:", err);
      })
      .finally(() => {
        popupFormAdd.renderLoading(false);
      });
  },
});

addNewCardButton.addEventListener("click", () => popupFormAdd.open());
popupFormAdd.setEventListeners();

//popup Edit
const popupFormEdit = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: (formData) => {
    popupFormEdit.renderLoading(true);
    api
      .editingProfileInfo({
        name: formData.title,
        about: formData.description,
      })
      .then((updatedUserData) => {
        userInfo.setUserInfo({
          name: updatedUserData.name,
          job: updatedUserData.about,
          id: updatedUserData.id,
        });
        // popupFormEdit.close();
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
      })
      .finally(() => {
        popupFormEdit.renderLoading(false);
      });
  },
});

const userInfo = new UserInfo({
  nameSelector: "#profile__title-js",
  jobSelector: "#profile__description-js",
  avatarSelector: ".profile__image",
});

profileEditBtn.addEventListener("click", () => {
  const { name, job } = userInfo.getUserInfo();
  inputName.value = name;
  inputDescription.value = job;
  popupFormEdit.open();
  popupFormEdit.setEventListeners();
});

// popup with image
const imagePopup = new PopupWithImage("#preview-modal");
imagePopup.setEventListeners();

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "c53257a5-9817-4cec-8792-f1f3ce4f9e8b",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([userData, cards]) => {
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
      _id: userData._id,
      avatar: userData.avatar,
    });

    cards.forEach((cardData) => {
      const cardElement = createCard(cardData);
      section.addItem(cardElement);
    });
  })
  .catch((err) => {
    console.error("Error loading app info:", err);
  });

//popup change profile image

const popupAvatarForm = new PopupWithForm({
  popupSelector: "#profile-avatar-modal",
  handleFormSubmit: (formData) => {
    popupAvatarForm.renderLoading(true);
    return api
      .updateAvatar({ avatar: formData.avatar })
      .then((user) => {
        profileImage.src = user.avatar;
        popupAvatarForm.close();
      })
      .catch((err) => console.error("Error updating avatar:", err))
      .finally(() => {
        popupAvatarForm.renderLoading(false);
      });
  },
});

popupAvatarForm.setEventListeners();

avatarEditBtn.addEventListener("click", () => {
  popupAvatarForm.open();
});
