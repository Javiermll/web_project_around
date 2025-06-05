// --------------------------
// IMPORTACIONES
// --------------------------

import Card from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import {
  openImagePopup,
  closeImagePopup,
  setupImagePopupListeners,
  isValidImageUrl,
} from "./utils.js";

// --------------------------
// DATOS INICIALES DE TARJETAS
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
// ELEMENTOS DEL DOM (Tarjetas)
// --------------------------
const cardsContainer = document.querySelector(".elements");
const cardTemplate = document.querySelector("#card-template");

// --------------------------
// ELEMENTOS DEL DOM (Popups)
// --------------------------

// Popup editar perfil
const popupEdit = document.querySelector("#editProfilePopup");
const btnOpenEdit = document.querySelector("#Open-Poput");
const btnCloseEdit = document.querySelector("#Close-Popup");
const formEditProfile = popupEdit.querySelector(".popup__form");
const inputName = document.getElementById("popup-name");
const inputAbout = document.getElementById("popup-about");
const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");

// Popup agregar tarjeta
const popupAddCard = document.querySelector("#addCardPopup");
const btnOpenAdd = document.querySelector("#OpenPoput-add");
const btnCloseAdd = document.querySelector("#ClosePopup-Add");
const formAddCard = popupAddCard.querySelector(".popup__form-add");
const inputPlace = document.getElementById("popup-place");
const inputUrl = document.getElementById("popup-image-url");

// --------------------------
// LISTENERS INICIALES (utils.js)
// --------------------------
setupImagePopupListeners();

// --------------------------
// RENDERIZAR TARJETAS INICIALES
// Incertar las tarjetas iniciales al cargar la pagina
// --------------------------
initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#card-template", openImagePopup);
  cardsContainer.append(card.generateCard());
});

// --------------------------
// INSTANCIAS DE VALIDACIÓN
// --------------------------
const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup_button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const formEditValidator = new FormValidator(config, formEditProfile);
formEditValidator.enableValidation();

const formAddValidator = new FormValidator(config, formAddCard);
formAddValidator.enableValidation();

// --------------------------
// FUNCIONES - POPUP EDITAR PERFIL
// Apertura, cierre y logica del formulario del perfil
// --------------------------
btnOpenEdit.addEventListener("click", () => {
  formEditProfile.reset(); // limpia los campos del formulario
  formEditValidator.resetValidation(); // limpia errores y botón
  popupEdit.showModal();
});

btnCloseEdit.addEventListener("click", () => {
  popupEdit.close();
});

formEditProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileOccupation.textContent = inputAbout.value;
  popupEdit.close();
});

// --------------------------
// FUNCIONES - POPUP AGREGAR TARJETA
// Apertura, cierre y logica del formulario de nueva tarjeta.
// --------------------------
btnOpenAdd.addEventListener("click", () => {
  formAddCard.reset(); // limpia los campos del formulario
  formAddValidator.resetValidation(); // limpia errores y botón
  popupAddCard.showModal();
});

btnCloseAdd.addEventListener("click", () => {
  popupAddCard.close();
});

formAddCard.addEventListener("submit", (evt) => {
  evt.preventDefault();

  if (!isValidImageUrl(inputUrl.value)) {
    const errorElement = document.createElement("p");
    errorElement.classList.add("error-message");
    errorElement.textContent = "URL de imagen no válida";
    inputUrl.insertAdjacentElement("afterend", errorElement);
    setTimeout(() => errorElement.remove(), 3000);
    return;
  }

  const newCard = new Card(
    { name: inputPlace.value, link: inputUrl.value },
    "#card-template",
    openImagePopup
  );

  cardsContainer.prepend(newCard.generateCard());
  formAddCard.reset();
  popupAddCard.close();
});
