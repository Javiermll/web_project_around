// --------------------------
// CLASE CARD (POO)
// --------------------------

// --------------------------
// CLASE CARD (POO)
// --------------------------

export default class Card {
  constructor(data, templateSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => this._handleLikeIcon());
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteCard()
    );

    this._cardImage.addEventListener("click", (e) => {
      e.stopPropagation();
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  _handleLikeIcon() {
    if (this._likeIcon.src.includes("_black.")) {
      this._likeIcon.src = "./images/Vector2_corazon.svg";
    } else {
      this._likeIcon.src = "./images/Vector2_corazon_black.svg";
    }
  }

  _handleDeleteCard() {
    this._element.classList.add("card--fade-out");
    setTimeout(() => {
      this._element.remove();
      this._element = null;
    }, 300);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");
    this._likeButton = this._element.querySelector(".card__link");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._likeIcon = this._element.querySelector(".card__link-logo");
    this._cardActions = this._element.querySelector(".card__actions");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    // Configurar event listeners
    this._setEventListeners();
    return this._element;
  }
}
