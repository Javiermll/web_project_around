export class FormValidator {
  constructor(config, formElement) {
    this._config = config; // Almacena la configuración. Config: Objetos con selectores CSS y clases para personalizacion
    this._formElement = formElement; // Referencia al formulario DOM
    this._inputList = Array.from(
      formElement.querySelectorAll(config.inputSelector)
    ); //Lista de inputs
    this._submitButton = formElement.querySelector(config.submitButtonSelector); //Boton de submit
  }

  //Metodos Privados
  //1. Mostrar errores (showInputError). Manejo de error visual
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  //2. Ocultar errores (hideInputError). Manejo de error visual
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = "";
  }

  //3. Validar input (checkInputValidity). Validacion Individual.
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  //4. Deabilitar el boton si hay errores.
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  //5.Alternar el estado del boton.
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._config.inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(this._config.inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  //6. Configuracion de EventListeners.
  _setEventListeners() {
    this._toggleButtonState(); // Estado inicial

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  //METODOS PUBLICOS
  //7. Inicia la validacion
  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }

  //8. Limpia errores y estado del boton
  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
  }
}

//9. Configuración para todos los formularios
const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup_button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Habilitar validación para cada formulario
document.querySelectorAll(config.formSelector).forEach((formElement) => {
  const validator = new FormValidator(config, formElement);
  validator.enableValidation();
});
