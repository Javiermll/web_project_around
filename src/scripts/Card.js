export default class Card {
  constructor(
    data,
    templateSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick,
    userId
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes || [];
    this._ownerId = data.owner._id;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._userId = userId;

    // Inicializa el estado de "me gusta"
    this._isLiked = this._isLiked();
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this._id, this._isLiked, this);
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this._id, this._element);
    });

    this._cardImage.addEventListener("click", (e) => {
      e.stopPropagation();
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  _isLiked() {
    return this._likes.some((user) => user._id === this._userId);
  }

  _toggleLikeIcon() {
    if (this._isLiked) {
      this._likeIcon.classList.add("card__link-logo--active");
    } else {
      this._likeIcon.classList.remove("card__link-logo--active");
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");
    this._likeButton = this._element.querySelector(".card__link");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._likeIcon = this._element.querySelector(".card__link-logo");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    // Actualiza el ícono del corazón basado en el estado inicial
    this._toggleLikeIcon();

    // Configurar event listeners
    this._setEventListeners();
    return this._element;
  }

  updateLikes(likesArray) {
    this._likes = likesArray;
    this._isLiked = this._isLiked(); // Re-calcula el estado de "me gusta"
    this._toggleLikeIcon(); // Actualiza el icono del corazón
  }
}
