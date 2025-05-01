import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import {
  SELECTORS,
  initialCards,
  validationConfig,
} from "../utils/constants.js";

const gallerySection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, SELECTORS.gallery.cardTemplate, (data) =>
        imagePopup.open(data)
      );
      gallerySection.addItem(card.getView());
    },
  },
  SELECTORS.gallery.container
);

// Crear instancias para cada popup
const editProfilePopup = new PopupWithForm(
  SELECTORS.popups.editProfile,
  (formData) => {
    userInfo.setUserInfo(formData);
  }
);
const newPlacePopup = new PopupWithForm(
  SELECTORS.popups.newPlace,
  ({ title, imageUrl }) => {
    const card = new Card(
      { title, imageUrl },
      SELECTORS.gallery.cardTemplate,
      (data) => imagePopup.open(data)
    );
    gallerySection.addItem(card.getView());
  }
);
const imagePopup = new PopupWithImage(SELECTORS.popups.image);

editProfilePopup.setEventListeners();
newPlacePopup.setEventListeners();
imagePopup.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: SELECTORS.profile.name,
  descriptionSelector: SELECTORS.profile.description,
});

// Event listeners
document
  .querySelector(SELECTORS.profile.editButton)
  .addEventListener("click", () => {
    const { name, description } = userInfo.getUserInfo();
    document.querySelector(SELECTORS.inputs.profileName).value = name;
    document.querySelector(SELECTORS.inputs.profileDescription).value = description;
    editProfilePopup.open();
  });

document
  .querySelector(SELECTORS.profile.addButton)
  .addEventListener("click", () => {
    // Limpia los inputs del formulario de nuevo lugar
    document.querySelector(SELECTORS.inputs.placeTitle).value = "";
    document.querySelector(SELECTORS.inputs.placeImageUrl).value = "";
    newPlacePopup.open();
  });

// Inicialización
function init() {
  // Validadores
  new FormValidator(
    validationConfig,
    document.querySelector(SELECTORS.forms.editProfile)
  ).enableValidation();
  new FormValidator(
    validationConfig,
    document.querySelector(SELECTORS.forms.newPlace)
  ).enableValidation();

  gallerySection.renderItems();
}

// Iniciar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", init);
