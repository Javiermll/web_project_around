// UserInfo.js
export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector); // NUEVO
  }

  // Devuelve un objeto con los valores actuales del perfil
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
    };
  }

  // Actualiza el DOM con los nuevos datos del usuario
  setUserInfo({ name, about, avatar }) {
    if (name) this._nameElement.textContent = name;
    if (about) this._aboutElement.textContent = about;
    if (avatar && this._avatarElement) {
      this._avatarElement.src = avatar;
    }
  }
}
