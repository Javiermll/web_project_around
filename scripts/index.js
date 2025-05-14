// INICIAR EL POPUP Y CERRARLO (Boton Editar profile)
const OpenPoput = document.querySelector("#Open-Poput");
const ClosePoput = document.querySelector("#Close-Popup");
const Popup = document.querySelector("#editProfilePopup");

OpenPoput.addEventListener("click", () => {
  Popup.showModal();
});

ClosePoput.addEventListener("click", () => {
  Popup.close();
});

// Guardar valores del POPUP
let formElement = document.querySelector(".popup__form"); // 1. Busquemos el formulario en el DOM. Seleccion de formulario
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // 2. Lo siguiente es el manipulador (handler) de entrega de formularios.

  let nameInput = document.getElementById("popup-name"); // // 3: Busquemos los campos del formulario en el DOM. Utiliza el método querySelector()
  let occupationInput = document.getElementById("popup-about"); // Utiliza el método querySelector()

  const newName = nameInput.value; // 4: Obtén los valores de cada campo desde la propiedad de valor correspondiente
  const NewOccupation = occupationInput.value;

  const profileName = document.querySelector(".profile__name"); // 5: Selecciona los elementos donde se introducirán los valores de los campos
  const profileOccupation = document.querySelector(".profile__occupation");

  profileName.textContent = newName; // 6: Inserta nuevos valores utilizando el textContent. Propiedad del metodo querySelector()
  profileOccupation.textContent = NewOccupation;

  const popup = document.getElementById("editProfilePopup");
  popup.close();
}
formElement.addEventListener("submit", handleProfileFormSubmit); // 7: Conecta el manipulador (handler) al formulario. Se observará el evento de entrega

//Proyecto 8
//PASO1: Creacion de tarjetas
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

//1.3 Iterar y renderizar todas las tarjetas
const cardsContainer = document.querySelector(".elements"); //Seleccion del contendor principa donde van las tarjetas
initialCards.forEach(function (cardData) {
  //Iterar sobre el Array: initialCards
  const cardElement = createCard(cardData); //Crear tarjeta llamando a funcion createCard
  cardsContainer.appendChild(cardElement);
});

//1.2. Funcion creadora. Retornara el elemento de tarjeta completamente construido.
function createCard(cardData) {
  const cardElement = document.createElement("article");
  cardElement.classList.add("card");

  const cardImage = document.createElement("img");
  cardImage.setAttribute("src", cardData.link); //Link
  cardImage.setAttribute("alt", cardData.name); //Nombre
  cardImage.classList.add("card__image"); //Clase CSS
  cardElement.appendChild(cardImage); //Imagen añadida como primer hijo del elemento article.

  //
  //Paso7: Evento para que la imagen se clicleable
  //
  cardImage.addEventListener("click", () => {
    openImagePopup(cardData.link, cardData.name);
  });

  //Paso6: Implementar eliminacion de tarjeta
  //Paso6.1: Implementar icono de eliminar.
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("card__delete-button");

  const deleteIcon = document.createElement("img");
  deleteIcon.src = "./images/Trash.svg";
  deleteIcon.alt = "Eliminar tarjeta";
  deleteIcon.classList.add("card__delete-icon");

  deleteButton.appendChild(deleteIcon); //Añadir el icono al boton de delete
  cardElement.appendChild(deleteButton); //Añadir el boton de delete al Elemento carta.

  //Paso6.2: Funcion para eliminar la carta.
  // Se añade funcionalidad de desvanecimiento a la tarjeta
  deleteButton.addEventListener("click", function () {
    cardActions.classList.add("card--fade-out"); //Aplicamos la clase que inicia la animacion
    setTimeout(() => {
      cardElement.remove(); //Eliminacion directa de todo el cardElement creado.
    }, 300);
  });

  //Implementar card__wrap
  /* <div class="card__wrap">
        <h2 class="card__title">Título</h2>
        <div class="card__actions">...</div>
      </div>*/

  const cardWrap = document.createElement("div");
  cardWrap.classList.add("card__wrap");
  cardElement.appendChild(cardWrap);

  //Implementar el titulo de las tarjetas
  /*<h2 class="card__title">Nombre del lugar</h2>*/
  const cardTitle = document.createElement("h2"); //Crear elemento de titulo
  cardTitle.classList.add("card__title"); //Añadir clase CSS
  cardTitle.textContent = cardData.name; //Asignar contenido de texto desde base de datos
  cardWrap.appendChild(cardTitle); //Se debe añadir dentro de card__wrap

  //Implementar seccion de accion de corazones
  /*<div class="card__actions">
         <button class="card__link">
         <img src="./images/Vector2_corazon.svg" class="card__link-logo">
         </button>
       </div>*/

  const cardActions = document.createElement("div"); //Crear elemento div para contenedor de boton
  cardActions.classList.add("card__actions"); //Crear la clase respectiva

  const likeButton = document.createElement("button"); //Crear el elemento button
  likeButton.classList.add("card__link"); //Clase

  const likeIcon = document.createElement("img"); //Crear elemento img para el icono
  likeIcon.src = "./images/Vector2_corazon.svg"; //Fuente de la image
  likeIcon.classList.add("card__link-logo"); //Clase
  likeIcon.alt = "Imagen de corazon";

  //Paso5: Implementar manejador de eventos para el boton like.
  //Metodo usado, cambiar la fuente de la imagen.
  likeButton.addEventListener("click", function () {
    if (likeIcon.src.includes("_black.")) {
      // Si ya está en negro, volver al original
      likeIcon.src = "./images/Vector2_corazon.svg";
    } else {
      // Si no está en negro, cambiarlo a negro
      likeIcon.src = "./images/Vector2_corazon_black.svg";
    }
  });

  likeButton.appendChild(likeIcon); //Icono dentro del boton
  cardActions.appendChild(likeButton); //Boton dentro del contenedor de acciones
  cardWrap.appendChild(cardActions); //Contenedor de acciones al cardWrap

  return cardElement;
}

//Paso4: Funcion de validacion de URLs
function isValidImageUrl(url) {
  return /\.(jpg|jpeg|png|gif)(\?.*)?$/i.test(url);
}

//Proyecto 8
//Paso2: Crear popup de addCard
const OpenPoputAdd = document.querySelector("#OpenPoput-add");
const ClosePoputAdd = document.querySelector("#ClosePopup-Add");
const popupAddCard = document.querySelector("#addCardPopup");

OpenPoputAdd.addEventListener("click", () => {
  popupAddCard.showModal();
});

ClosePoputAdd.addEventListener("click", () => {
  popupAddCard.close();
});

//Paso3: Implementar la adicion de tarjetas
const addCardPopup = document.getElementById("addCardPopup"); //Seleccionar popup de añadir tarjeta
const addCardForm = document.querySelector(".popup__form-add"); //Seleccion del formulario
const placeInput = document.getElementById("popup-place"); //Seleccion de imput: Place
const urlInput = document.getElementById("popup-image-url"); //Seleccion de input: URL

//Creacion de la funcion manejadora
function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const imageURL = urlInput.value;
  if (!isValidImageUrl(imageURL)) {
    // Ejemplo con un elemento para mensajes de error
    const errorElement = document.createElement("p");
    errorElement.classList.add("error-message");
    errorElement.textContent = "URL de imagen no válida";

    // Inserta después del input
    urlInput.insertAdjacentElement("afterend", errorElement);

    // Elimina el mensaje después de 3 segundos
    setTimeout(() => errorElement.remove(), 3000);
  }

  //Recoger datos del formulario
  const newCardData = {
    //Crear objeto con los datos
    name: placeInput.value,
    link: urlInput.value,
  };

  //Crear y añadir la nueva tarjeta
  const newCard = createCard(newCardData); //Usar la funcion existente
  cardsContainer.prepend(newCard); //Añadir la tarjeta al inicio del contenedor

  addCardPopup.close(); //Cerrar el popup y limpiar el formulario
  addCardForm.reset(); //limpiar campos del formulario
}
//Conectar event listener
addCardForm.addEventListener("submit", handleAddCardSubmit);

//
//
//
//Paso7: Javascript para abrir/cerrar popup de imagen
const imagePopup = document.getElementById("imagePopup"); //Seleccionar popup de ventana emergente
const popupImage = imagePopup.querySelector(".popup__image"); //Seleccion de la imagen
const popupCaption = imagePopup.querySelector(".popup__caption");
const closeButton = imagePopup.querySelector(".popup__close-button_type_image");

//Funcion para abrir el popup
function openImagePopup(imageSrc, captionText) {
  popupImage.src = imageSrc;
  popupImage.alt = captionText;
  popupCaption.textContent = captionText;
  imagePopup.classList.add("popup_opened");
}

//Funcion para cerrar el popup
function closeImagePopup() {
  imagePopup.classList.remove("popup_opened");
}

closeButton.addEventListener("click", closeImagePopup);

imagePopup.addEventListener("click", (evt) => {
  if (evt.target === imagePopup) {
    closeImagePopup();
  }
});

document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape" && imagePopup.classList.contains("popup_opened")) {
    closeImagePopup();
  }
});
