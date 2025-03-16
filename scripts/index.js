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
const imagePopup = document.querySelector('#image-popup');
const imageBtnClose = imagePopup.querySelector('.pop-up__btn_close');
const imagePopupImg = imagePopup.querySelector('.pop-up__img');
const imageTitle = imagePopup.querySelector('.pop-up__img-title');

const initialCards = [
  {
    title: "Chicago Botanic Garden",
    imageUrl: "images/chicago-botanic-garden.jpg"
  },
  {
    title: "Keukenhof",
    imageUrl: "images/keukenhof.jpg"
  },
  {
    title: "Lavender Fields",
    imageUrl: "images/lavender-fields.jpg"
  },
  {
    title: "Skagit Valley",
    imageUrl: "images/skagit-valley.jpg"
  },
  {
    title: "Ueno Park Tokyo",
    imageUrl: "images/ueno-park-tokyo.jpg"
  },
  {
    title: "Water Lily Lagoon",
    imageUrl: "images/water-lily-lagoon.jpg"
  }
];


// Events
renderInitialCards();
editProfileBtnSave.addEventListener("click", handleProfileFormSubmit);
profileBtnEdit.addEventListener("click", toggleEditProfilePopup);
editProfileBtnClose.addEventListener("click", toggleEditProfilePopup);
editProfileForm.addEventListener("input", validateForm);
profileBtnAddPost.addEventListener("click", toggleNewPlacePopup);
newPlaceBtnClose.addEventListener("click", toggleNewPlacePopup);
newPlaceBtnAdd.addEventListener("click", (evt) => {
  evt.preventDefault();
  const data = {
    title: newPlaceTitle.value,
    imageUrl: newPlaceLink.value,
  };
  const card = createCard(data);
  gallery.prepend(card);
});
imageBtnClose.addEventListener('click', toggleImagePopup);

// Delegación de eventos para el popup
gallery.addEventListener("click", (e) => {
  if (e.target.classList.contains("gallery-card__image")) {
    toggleImagePopup();
    imagePopupImg.src = e.target.src;
    imageTitle.textContent = e.target.alt;
    imagePopupImg.alt = e.target.alt;
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

  const trashButton = cardElement.querySelector(".gallery-card__btn_trash");
  trashButton.addEventListener("click", () => deleteCard(cardElement));

  const likeBtn = cardElement.querySelector(".gallery-card__btn_like");
  likeBtn.addEventListener("click", () => {
    toggleLike(likeBtn);
  });

  toggleNewPlacePopup();
  return cardElement;
}

function deleteCard(card) {
  card.remove();
}

function renderInitialCards(){
  initialCards.forEach((card) => {
    const cardElement = createCard(card);
    gallery.prepend(cardElement);
  });
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editProfileName.value;
  profileDescription.textContent = editProfileDescription.value;
  toggleEditProfilePopup();
}

function toggleEditProfilePopup() {
  editProfileName.value = profileName.textContent;
  editProfileDescription.value = profileDescription.textContent;
  editProfilePopup.classList.toggle("pop-up_opened");
  validateForm();
}

function toggleNewPlacePopup() {
  newPlacePopup.classList.toggle("pop-up_opened");
}

function toggleImagePopup() {
  imagePopup.classList.toggle("pop-up_opened");
  validateForm();
}

function validateForm() {
  if (editProfileName.value.trim() && editProfileDescription.value.trim()) {
    editProfileBtnSave.disabled = false;
  } else editProfileBtnSave.disabled = true;
}

function toggleLike(likeBtn) {
  likeBtn.classList.toggle("gallery-card__btn_like_active");
}
