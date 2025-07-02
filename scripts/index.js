// --------------------------
// IMPORTACIONES DE CLASES Y UTILIDADES
// --------------------------

import Section from "./Section.js";
import Card from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { isValidImageUrl } from "./utils.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";
import UserInfo from "./UserInfo.js";
import Api from "./Api.js";

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "60c65a7f-3cd5-4016-91c0-d95efac7e3e1",
    "Content-Type": "application/json",
  },
});

// --------------------------
// ELEMENTOS DEL DOM - POPUP EDITAR PERFIL
// --------------------------

const btnOpenEdit = document.querySelector("#Open-Poput");
const btnOpenAdd = document.querySelector("#OpenPoput-add");

const formEditProfile = document.querySelector(
  "#editProfilePopup .popup__form"
);
const formAddCard = document.querySelector("#addCardPopup .popup__form-add");

const inputUrl = document.getElementById("popup-image-url");
const inputName = formEditProfile.querySelector("#popup-name");
const inputAbout = formEditProfile.querySelector("#popup-about");

// --------------------------
// INSTANCIA DE USERINFO
// --------------------------

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__occupation",
  avatarSelector: ".profile__avatar",
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
    });

    document.querySelector(".profile__avatar").src = userData.avatar;

    window.currentUserId = userData._id;
    cardSection.renderItems(cards);
  })
  .catch((err) => {
    console.error("Error al cargar datos iniciales:", err);
  });

// --------------------------
// INSTANCIA DEL POPUP DE IMAGEN
// Muestra una imagen en grande al hacer clic en una tarjeta
// --------------------------

const imagePopup = new PopupWithImage("#imagePopup");
imagePopup.setEventListeners();

const handleCardClick = ({ name, link }) => {
  imagePopup.open({ name, link });
};

// --------------------------
// INSTANCIAS - PopupWithConfirmation
// --------------------------

const deleteCardPopup = new PopupWithConfirmation("#deleteCardPopup");
deleteCardPopup.setEventListeners();

// --------------------------
// INSTANCIA DE SECTION - CONTENEDOR DE TARJETAS
// Renderiza las tarjetas iniciales y permite agregar nuevas
// --------------------------

const handleDeleteCard = (cardId, cardElement) => {
  deleteCardPopup.setSubmitAction(() => {
    api
      .deleteCard(cardId)
      .then(() => {
        cardElement.remove();
        deleteCardPopup.close();
      })
      .catch((err) => {
        console.error("Error al eliminar tarjeta:", err);
      });
  });

  deleteCardPopup.open();
};

const handleLikeClick = (cardId, isLiked, cardInstance) => {
  const likeRequest = isLiked ? api.unlikeCard(cardId) : api.likeCard(cardId);
  likeRequest
    .then((updatedCard) => {
      cardInstance._isLiked = !isLiked; // Actualiza el estado local
      cardInstance._toggleLikeIcon(); // Cambia el ícono del corazón
    })
    .catch((err) => {
      console.error("Error al cambiar estado de like:", err);
    });
};

const cardSection = new Section(
  {
    items: [], // ya no usamos initialCards
    renderer: (cardData) => {
      const card = new Card(
        cardData,
        "#card-template",
        handleCardClick,
        handleDeleteCard,
        handleLikeClick,
        window.currentUserId
      );
      const cardElement = card.generateCard();
      cardSection.addItem(cardElement); //
    },
  },
  ".elements"
);

// --------------------------
// INSTANCIAS DE VALIDACIÓN DE FORMULARIOS
// --------------------------

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup_button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// --------------------------
// VALIDADORES DE FORMULARIOS
// --------------------------

const formEditValidator = new FormValidator(config, formEditProfile);
formEditValidator.enableValidation();

const formAddValidator = new FormValidator(config, formAddCard);
formAddValidator.enableValidation();

// --------------------------
// POPUP: EDITAR PERFIL
// --------------------------

const editProfilePopup = new PopupWithForm("#editProfilePopup", (formData) => {
  editProfilePopup.setLoadingText(true);

  api
    .updateUserInfo({
      name: formData["popup-name"],
      about: formData["popup-about"],
    })
    .then((updatedData) => {
      userInfo.setUserInfo({
        name: updatedData.name,
        about: updatedData.about,
      });
      editProfilePopup.close();
    })
    .catch((err) => {
      console.error("Error al actualizar el perfil:", err);
    })
    .finally(() => {
      editProfilePopup.setLoadingText(false);
    });
});

editProfilePopup.setEventListeners();

btnOpenEdit.addEventListener("click", () => {
  formEditValidator.resetValidation();
  editProfilePopup.open();
});

// --------------------------
// POPUP: AGREGAR TARJETA
// --------------------------

const addCardPopup = new PopupWithForm("#addCardPopup", (formData) => {
  if (!isValidImageUrl(formData["popup-image-url"])) {
    const errorElement = document.createElement("p");
    errorElement.classList.add("error-message");
    errorElement.textContent = "URL de imagen no válida";
    inputUrl.insertAdjacentElement("afterend", errorElement);
    setTimeout(() => errorElement.remove(), 3000);
    return;
  }

  addCardPopup.setLoadingText(true);

  api
    .addCard({
      name: formData["popup-place"],
      link: formData["popup-image-url"],
    })
    .then((cardData) => {
      const newCard = new Card(
        cardData,
        "#card-template",
        handleCardClick,
        handleDeleteCard,
        handleLikeClick,
        window.currentUserId
      );
      const cardElement = newCard.generateCard();
      cardSection.addItem(cardElement);
      addCardPopup.close();
    })
    .catch((err) => {
      console.error("Error al agregar tarjeta:", err);
    })
    .finally(() => {
      addCardPopup.setLoadingText(false);
    });
});

addCardPopup.setEventListeners();

btnOpenAdd.addEventListener("click", () => {
  formAddValidator.resetValidation();
  addCardPopup.open();
});

// --------------------------
// INSTANCIA DE SECTION - CONTENEDOR DE TARJETAS
// Renderiza las tarjetas iniciales y permite agregar nuevas
// --------------------------

const formAvatar = document.querySelector("#avatarPopup .popup__form-avatar");
const avatarInput = formAvatar.querySelector("#avatar-url");

const formAvatarValidator = new FormValidator(config, formAvatar);
formAvatarValidator.enableValidation();

const avatarPopup = new PopupWithForm("#avatarPopup", (formData) => {
  avatarPopup.setLoadingText(true);

  api
    .updateAvatar({ avatar: formData.avatar })
    .then((updatedUser) => {
      const avatarImg = document.querySelector(".profile__avatar");

      // Define el listener antes de cambiar el src
      const handleImageLoad = () => {
        avatarImg.removeEventListener("load", handleImageLoad);
        avatarPopup.close();
      };

      avatarImg.addEventListener("load", handleImageLoad);

      // Actualiza el DOM (esto cambiará el src de la imagen)
      userInfo.setUserInfo({
        avatar: updatedUser.avatar,
        name: updatedUser.name,
        about: updatedUser.about,
      });

      // En caso de que la imagen ya esté cargada (desde caché)
      if (avatarImg.complete) {
        avatarImg.removeEventListener("load", handleImageLoad);
        avatarPopup.close();
      }
    })
    .catch((err) => {
      console.error("Error al actualizar avatar:", err);
    })
    .finally(() => {
      avatarPopup.setLoadingText(false);
    });
});

avatarPopup.setEventListeners();

document
  .querySelector(".profile__avatar-overlay")
  .addEventListener("click", () => {
    formAvatarValidator.resetValidation();
    avatarPopup.open();
  });
