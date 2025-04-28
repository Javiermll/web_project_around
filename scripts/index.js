// INICIAR EL POPUP Y CERRARLO
const OpenPoput = document.querySelector("#Open-Poput");
const ClosePoput = document.querySelector("#Close-Popup");
const Popup = document.querySelector("#editProfilePopup");

OpenPoput.addEventListener("click", () => {
  Popup.showModal();
});

ClosePoput.addEventListener("click", () => {
  Popup.close();
});

// 1. Busquemos el formulario en el DOM. Seleccion de formulario
// querySelector():Metodo que busca el primer elemento que coincida con el selector CSS proporcionado*/
//
// 2: Lo siguiente es el manipulador (handler) de entrega de formularios, aunque no se enviará en
//   ningún sitio todavía. Observa que el nombre de la función comienza con un verbo y describe exactamente
//   lo que hace la función

//   Esta línea impide que el navegador entregue el formulario en su forma predeterminada.
//   Una vez hecho esto, podemos definir nuestra propia forma de entregar el formulario.
//   Lo explicaremos todo con más detalle después.

// 3: Busquemos los campos del formulario en el DOM
// 4: Obtén los valores de cada campo desde la propiedad de valor correspondiente
// 5: Selecciona los elementos donde se introducirán los valores de los campos
// 6: Inserta nuevos valores utilizando el textContent. Propiedad del metodo querySelector()
// 7: Conecta el manipulador (handler) al formulario. Se observará el evento de entrega

// Guardar valores del POPUP
//1
let formElement = document.querySelector(".popup__form");
//2.
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  //3.
  let nameInput = document.getElementById("popup-name"); // Utiliza el método querySelector()
  let occupationInput = document.getElementById("popup-about"); // Utiliza el método querySelector()
  //4.
  const newName = nameInput.value;
  const NewOccupation = occupationInput.value;

  //5.
  const profileName = document.querySelector(".profile__name");
  const profileOccupation = document.querySelector(".profile__occupation");

  //6.
  profileName.textContent = newName;
  profileOccupation.textContent = NewOccupation;

  const popup = document.getElementById("editProfilePopup");
  popup.close();
}

// 7.
formElement.addEventListener("submit", handleProfileFormSubmit);
