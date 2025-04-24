// Funciones para popups
export function togglePopup(popup) {
  popup.classList.toggle('pop-up_opened');
}

export function closeOnOverlay(popupElement, overlayElement, closeFunction) {
  overlayElement.addEventListener('click', (e) => {
    if (e.target === overlayElement) {
      closeFunction();
    }
  });
  popupElement.addEventListener('click', (e) => e.stopPropagation());
}

// Handler genérico para formularios
export function getProfileData() {
  return {
    name: document.querySelector('.profile__name').textContent,
    description: document.querySelector('.profile__description').textContent
  };
}

export function setProfileData(name, description) {
  document.querySelector('.profile__name').textContent = name;
  document.querySelector('.profile__description').textContent = description;
}