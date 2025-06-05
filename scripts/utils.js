// --------------------------
// MANEJO DEL POPUP DE IMAGEN
// --------------------------

// Función mejorada para abrir el popup
// utils.js
export function openImagePopup(imageSrc, captionText) {
  const imagePopup = document.getElementById("imagePopup");
  const popupImage = imagePopup.querySelector(".popup__image");
  const popupCaption = imagePopup.querySelector(".popup__caption");

  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(imageSrc);
    img.onerror = () => reject(new Error("Error al cargar la imagen"));
    img.src = imageSrc;
  })
    .then((src) => {
      popupImage.src = src;
      popupImage.alt = captionText;
      popupCaption.textContent = captionText;
      imagePopup.showModal();
      document.body.style.overflow = "hidden";
    })
    .catch((error) => {
      console.error(error);
      popupCaption.textContent = "Error al cargar la imagen";
      popupImage.src = "";
      imagePopup.showModal();
    });
}

export function closeImagePopup() {
  const imagePopup = document.getElementById("imagePopup");
  imagePopup.close();
  document.body.style.overflow = "";
}

export function setupImagePopupListeners() {
  const imagePopup = document.getElementById("imagePopup");
  const closeImageButton = imagePopup.querySelector(
    ".popup__close-button_type_image"
  );

  closeImageButton.addEventListener("click", () => {
    closeImagePopup();
  });

  imagePopup.addEventListener("mousedown", (evt) => {
    if (evt.target === imagePopup) {
      closeImagePopup();
    }
  });

  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape" && imagePopup.open) {
      closeImagePopup();
    }
  });
}

// --------------------------
// FUNCIÓN UTILITARIA
// --------------------------
export function isValidImageUrl(url) {
  return /\.(jpg|jpeg|png|gif)(\?.*)?$/i.test(url);
}
