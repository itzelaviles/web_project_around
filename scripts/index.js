import { enableValidation, resetValidation } from './validate.js';
// Profile
const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileDescription = profile.querySelector(".profile__description");
const profileBtnEdit = profile.querySelector(".profile__btn_edit-info");
const profileBtnAddPost = profile.querySelector(".profile__btn_add-post");
// Gallery
const gallery = document.querySelector(".gallery");
const galleryBtnDelete = gallery.querySelector(".gallery-card__btn_trash");
// Edit profile popup
const editProfilePopup = document.querySelector("#edit-profile-popup");
const editProfileName = editProfilePopup.querySelector("#popup-name");
const editProfileDescription =
  editProfilePopup.querySelector("#popup-about-me");
const editProfileBtnSave = editProfilePopup.querySelector(".pop-up__btn_save");
const editProfileBtnClose =
  editProfilePopup.querySelector(".pop-up__btn_close");
const editProfileForm = editProfilePopup.querySelector(".pop-up__form");
// New place popup
const newPlacePopup = document.querySelector("#new-place-popup");
const newPlaceTitle = newPlacePopup.querySelector("#popup-place-title");
const newPlaceLink = newPlacePopup.querySelector("#popup-place-img");
const newPlaceBtnAdd = newPlacePopup.querySelector(".pop-up__btn_save");
const newPlaceBtnClose = newPlacePopup.querySelector(".pop-up__btn_close");
const newPlaceForm = newPlacePopup.querySelector(".pop-up__form");
// Image popup
const imagePopup = document.querySelector("#image-popup");
const imageBtnClose = imagePopup.querySelector(".pop-up__btn_close");
const imagePopupImg = imagePopup.querySelector(".pop-up__img");
const imageTitle = imagePopup.querySelector(".pop-up__img-title");

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

renderInitialCards();
editProfileBtnSave.addEventListener("click", handleProfileUpdate);
profileBtnEdit.addEventListener("click", () => togglePopup(editProfilePopup));
editProfileBtnClose.addEventListener("click", () =>
  togglePopup(editProfilePopup)
);
profileBtnAddPost.addEventListener("click", () => togglePopup(newPlacePopup));
newPlaceBtnClose.addEventListener("click", () => togglePopup(newPlacePopup));
newPlaceBtnAdd.addEventListener("click", (evt) => {
  evt.preventDefault();
  const data = {
    title: newPlaceTitle.value,
    imageUrl: newPlaceLink.value,
  };
  const card = createCard(data);
  gallery.prepend(card);
});
imageBtnClose.addEventListener("click", () => togglePopup(imagePopup));
setUpCardEventListeners();

// image-popup event delegation
gallery.addEventListener("click", (e) => {
  if (e.target.classList.contains("gallery-card__image")) {
    togglePopup(imagePopup);
    imagePopupImg.src = e.target.src;
    imageTitle.textContent = e.target.alt;
    imagePopupImg.alt = e.target.title;
  }
});

// Functions
function createCard(data) {
  const cardTemplate = document.querySelector("#gallery-card-template").content;
  const cardElement = cardTemplate
    .querySelector(".gallery-card")
    .cloneNode(true);
  cardElement.querySelector(".gallery-card__title").textContent = data.title;
  const cardImage = cardElement.querySelector(".gallery-card__image");
  cardImage.src = data.imageUrl;
  cardImage.alt = data.title;
  cardImage.title = data.title;

  togglePopup(newPlacePopup);
  return cardElement;
}

function renderInitialCards() {
  initialCards.forEach((card) => {
    const cardElement = createCard(card);
    gallery.prepend(cardElement);
  });
}

// like & delete event delegation
function setUpCardEventListeners() {
  gallery.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("gallery-card__btn_trash")) {
      deleteCard(evt.target.closest(".gallery-card")); // search closest card
    }

    if (evt.target.classList.contains("gallery-card__btn_like")) {
      toggleLike(evt.target);
    }
  });
}

function deleteCard(card) {
  card.remove();
}


function handleProfileUpdate(evt) {
  evt.preventDefault();
  profileName.textContent = editProfileName.value;
  profileDescription.textContent = editProfileDescription.value;
  togglePopup(editProfilePopup);
}

function togglePopup(popup) {
  if (popup.id === "edit-profile-popup") {
    editProfileName.value = profileName.textContent;
    editProfileDescription.value = profileDescription.textContent;
  } else if (popup.id === "new-place-popup") {
    popup.querySelector("#new-place-form").reset();
  }
  resetValidation(popup);
  popup.classList.toggle("pop-up_opened");
}

function toggleLike(likeBtn) {
  likeBtn.classList.toggle("gallery-card__btn_like_active");
}

// Add listener to close popup if click outside card
function closeOnOverlay(popupElement, overlayElement, closeFunction) {
  overlayElement.addEventListener("click", (e) => {
    if (e.target === overlayElement) {
      closeFunction();
    }
  });

  // Prevent click from bubbling up to parent elements
  popupElement.addEventListener("click", (e) => {
    e.stopPropagation();
  });
}

// Select all popups
const popupList = Array.from(document.querySelectorAll(".pop-up"));
popupList.forEach((popupElement) => {
  closeOnOverlay(
    popupElement.querySelector(".pop-up__card, .pop-up__section"),
    popupElement,
    () => togglePopup(popupElement)
  );
});

const validationConfig = {
  formSelector: ".pop-up__form",
  inputSelector: ".pop-up__input",
  submitButtonSelector: ".pop-up__btn_save",
  inactiveButtonClass: "pop-up__btn_disabled", // Esta clase deberás crearla en tu CSS
  inputErrorClass: "pop-up__input_type_error",
  errorClass: "pop-up__input-error_active"
};

enableValidation();