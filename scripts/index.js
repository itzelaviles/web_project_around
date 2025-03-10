let profile = document.querySelector('.profile');
let popup = document.querySelector('.pop-up');
let gallery = document.querySelector('.gallery');

let profileName = profile.querySelector(".profile__name");
let profileDescription = profile.querySelector(".profile__description");
let popupName = popup.querySelector('#popup-name');
let popupDescription = popup.querySelector('#popup-about-me');
let btnSave = popup.querySelector('.pop-up__btn_save');
let btnEdit = profile.querySelector('.profile__btn_edit-info');
let btnClose = popup.querySelector('.pop-up__btn_close');
let popupForm = popup.querySelector('.pop-up__form');

let btnLikes = gallery.querySelectorAll('.gallery-card__btn_like');


btnSave.addEventListener('click', handleProfileFormSubmit);
btnEdit.addEventListener('click', togglePopup);
btnClose.addEventListener('click', togglePopup);
popupForm.addEventListener('input', validateForm);


btnLikes.forEach((btnLike) => {
  btnLike.addEventListener('click', () => {
    toggleLike(btnLike); 
  });
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
  togglePopup();
}

function togglePopup() {
  popupName.value = profileName.textContent;
  popupDescription.value= profileDescription.textContent;
  popup.classList.toggle('pop-up_opened');
  validateForm();
}

function validateForm() {
  if (popupName.value.trim() && popupDescription.value.trim()) {
    btnSave.disabled = false;
  } else btnSave.disabled = true;
}

function toggleLike(btnLike) {
  btnLike.classList.toggle('gallery-card__btn_like_active');
}