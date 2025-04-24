import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { togglePopup, closeOnOverlay, getProfileData, setProfileData } from './utils.js';

// Configuración
const validationConfig = {
  formSelector: '.pop-up__form',
  inputSelector: '.pop-up__input',
  submitButtonSelector: '.pop-up__btn_save',
  inactiveButtonClass: 'pop-up__btn_disabled',
  inputErrorClass: 'pop-up__input_type_error',
  errorClass: 'pop-up__input-error_active'
};

// Handler para clic en imagen
function handleCardClick(data) {
  const imagePopup = document.querySelector('#image-popup');
  const imageElement = imagePopup.querySelector('.pop-up__img');
  const titleElement = imagePopup.querySelector('.pop-up__img-title');

  imageElement.src = data.imageUrl;
  imageElement.alt = data.title;
  titleElement.textContent = data.title;
  togglePopup(imagePopup);
}

// Handlers específicos
function handleProfileUpdate(evt) {
  evt.preventDefault();
  const form = evt.target;
  const nameInput = form.querySelector('#popup-name');
  const aboutInput = form.querySelector('#popup-about-me');

  setProfileData(nameInput.value, aboutInput.value);
  togglePopup(form.closest('.pop-up'));
}

function handleAddPlace(evt) {
  evt.preventDefault();
  const form = evt.target;
  const titleInput = form.querySelector('#popup-place-title');
  const linkInput = form.querySelector('#popup-place-img');

  const card = new Card(
    { title: titleInput.value, imageUrl: linkInput.value },
    '#gallery-card-template',
    handleCardClick
  );

  document.querySelector('.gallery').prepend(card.getView());
  form.reset();
  togglePopup(form.closest('.pop-up'));
}

// Inicialización
function init() {
  // Validadores
  const editProfileValidator = new FormValidator(validationConfig, document.querySelector('#edit-profile-form'));
  const newPlaceValidator = new FormValidator(validationConfig, document.querySelector('#new-place-form'));
  editProfileValidator.enableValidation();
  newPlaceValidator.enableValidation();

  // Event listeners
  document.querySelector('.profile__btn_edit-info').addEventListener('click', () => {
    const popup = document.querySelector('#edit-profile-popup');
    const { name, description } = getProfileData();
    popup.querySelector('#popup-name').value = name;
    popup.querySelector('#popup-about-me').value = description;
    togglePopup(popup);
  });

  document.querySelector('.profile__btn_add-post').addEventListener('click', () => {
    togglePopup(document.querySelector('#new-place-popup'));
  });

  document.querySelectorAll('.pop-up__btn_close').forEach(btn => {
    btn.addEventListener('click', () => togglePopup(btn.closest('.pop-up')));
  });

  document.querySelector('#edit-profile-form').addEventListener('submit', handleProfileUpdate);
  document.querySelector('#new-place-form').addEventListener('submit', handleAddPlace);

  // Popups overlay
  document.querySelectorAll('.pop-up').forEach(popup => {
    closeOnOverlay(
      popup.querySelector('.pop-up__card, .pop-up__section'),
      popup,
      () => togglePopup(popup)
    );
  });

  // Render inicial
  const initialCards = [
    {
      title: "Chicago Botanic Garden",
      imageUrl: "images/chicago-botanic-garden.jpg",
    },
    {
      title: "Keukenhof",
      imageUrl: "images/keukenhof.jpg",
    },
    {
      title: "Lavender Fields",
      imageUrl: "images/lavender-fields.jpg",
    },
    {
      title: "Skagit Valley",
      imageUrl: "images/skagit-valley.jpg",
    },
    {
      title: "Ueno Park Tokyo",
      imageUrl: "images/ueno-park-tokyo.jpg",
    },
    {
      title: "Water Lily Lagoon",
      imageUrl: "images/water-lily-lagoon.jpg",
    },
  ];


  initialCards.forEach(cardData => {
    const card = new Card(cardData, '#gallery-card-template', handleCardClick);
    document.querySelector('.gallery').prepend(card.getView());
  });
}

// Iniciar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);