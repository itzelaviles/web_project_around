// Configuracion
export const validationConfig = {
  formSelector: ".pop-up__form",
  inputSelector: ".pop-up__input",
  submitButtonSelector: ".pop-up__btn_save",
  inactiveButtonClass: "pop-up__btn_disabled",
  inputErrorClass: "pop-up__input_type_error",
  errorClass: "pop-up__input-error_active",
};

// Render inicial
export const initialCards = [
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

// Uso de SELECTORS para evitar hardcodear strings y cambiar facilmente clases
export const SELECTORS = {
  profile: {
    name: ".profile__name",
    description: ".profile__description",
    avatar: ".profile__avatar",
    editInfoButton: ".profile__btn_edit-info",
    editAvatarButton: ".profile__btn_edit-avatar",
    addButton: ".profile__btn_add-post",
  },

  forms: {
    editProfile: "#edit-profile-form",
    newPlace: "#new-place-form",
    editAvatar: "#edit-avatar-form"
  },

  inputs: {
    profileName: "#popup-name",
    profileDescription: "#popup-about-me",
    placeTitle: "#popup-place-title",
    placeImageUrl: "#popup-place-img",
    avatarUrl: "#popup-avatar-url"
  },

  popups: {
    editProfile: "#edit-profile-popup",
    newPlace: "#new-place-popup",
    image: "#image-popup",
    deleteCard: "#delete-popup",
    editAvatar: "#edit-avatar-popup"
  },

  gallery: {
    container: ".gallery",
    cardTemplate: "#gallery-card-template",
  },
};
