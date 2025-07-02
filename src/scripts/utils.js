// --------------------------
// FUNCIÓN UTILITARIA
// --------------------------
export function isValidImageUrl(url) {
  return /\.(jpg|jpeg|png|gif)(\?.*)?$/i.test(url);
}
