// PopupWithForm.js
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popup.querySelector("form");
    this._inputList = Array.from(this._formElement.querySelectorAll("input"));
    this._submitButton = this._formElement.querySelector(".popup__button"); // ✅ AÑADIDO
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
    });
  }

  setLoadingText(isLoading, loadingMessage = "Guardando...") {
    if (!this._submitButton) return;

    if (isLoading) {
      this._originalButtonText = this._submitButton.textContent;
      this._submitButton.textContent = loadingMessage;
    } else {
      this._submitButton.textContent = this._originalButtonText;
    }
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
