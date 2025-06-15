// --------------------------
// IMPORTACIONES DE CLASES Y UTILIDADES
// --------------------------

import Section from "./Section.js";
import Card from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { isValidImageUrl } from "./utils.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
// --------------------------
// DATOS INICIALES PARA LAS TARJETAS
// --------------------------

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg",
  },
];

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
// INSTANCIA DE SECTION - CONTENEDOR DE TARJETAS
// Renderiza las tarjetas iniciales y permite agregar nuevas
// --------------------------

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = new Card(cardData, "#card-template", handleCardClick);
      const cardElement = card.generateCard();
      cardSection.addItem(cardElement);
    },
  },
  ".elements"
);

cardSection.renderItems();

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
  userInfo.setUserInfo({
    name: formData["popup-name"],
    about: formData["popup-about"],
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

  const newCard = new Card(
    { name: formData["popup-place"], link: formData["popup-image-url"] },
    "#card-template",
    handleCardClick
  );

  const cardElement = newCard.generateCard();
  cardSection.addItem(cardElement);
});

addCardPopup.setEventListeners();

btnOpenAdd.addEventListener("click", () => {
  formAddValidator.resetValidation();
  addCardPopup.open();
});
