export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    if (!this._popup.open) {
      this._popup.showModal();
      document.addEventListener("keydown", this._handleEscClose);
    }
  }

  close() {
    if (this._popup.open) {
      this._popup.close();
      document.removeEventListener("keydown", this._handleEscClose);
    }
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    // Cierra cuando se hace clic fuera del contenido
    this._popup.addEventListener("click", (evt) => {
      const dialogRect = this._popup.getBoundingClientRect();

      // Si el clic fue fuera del área visible del dialog, cerramos
      if (
        evt.clientX < dialogRect.left ||
        evt.clientX > dialogRect.right ||
        evt.clientY < dialogRect.top ||
        evt.clientY > dialogRect.bottom ||
        evt.target.classList.contains("popup__close")
      ) {
        this.close();
      }
    });
  }
}
