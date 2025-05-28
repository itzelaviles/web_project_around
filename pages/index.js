import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { UserInfo } from "../components/UserInfo.js";
import {
  SELECTORS,
  validationConfig,
} from "../utils/constants.js";
import { Api } from "../components/Api.js";

const api = new Api({
  baseUrl: 'https://around-api.es.tripleten-services.com/v1',
  headers: {
    authorization: "82bdebfc-6145-4c03-b430-768c5ddede6a",
    "Content-Type": 'application/json'
  }
})

// Cachear elementos del DOM reutilizados
const DOM = {
  forms: {
    editProfile: document.querySelector(SELECTORS.forms.editProfile),
    newPlace: document.querySelector(SELECTORS.forms.newPlace),
    editAvatar: document.querySelector(SELECTORS.forms.editAvatar)
  },
  inputs: {
    profileName: document.querySelector(SELECTORS.inputs.profileName),
    profileDescription: document.querySelector(
      SELECTORS.inputs.profileDescription
    ),
    placeTitle: document.querySelector(SELECTORS.inputs.placeTitle),
    placeImageUrl: document.querySelector(SELECTORS.inputs.placeImageUrl),
    avatarUrl: document.querySelector(SELECTORS.inputs.avatarUrl)
  },
  profile: {
    name: document.querySelector(SELECTORS.profile.name),
    description: document.querySelector(SELECTORS.profile.description),
    avatar: document.querySelector(SELECTORS.profile.avatar),
    editInfoButton: document.querySelector(SELECTORS.profile.editInfoButton),
    editAvatarButton: document.querySelector(SELECTORS.profile.editAvatarButton),
    addButton: document.querySelector(SELECTORS.profile.addButton),
  },
};

// Creacion de popups
const editProfilePopup = new PopupWithForm(
  SELECTORS.popups.editProfile,
  (formData) => {
    return api.updateUserInfo(formData)
      .then((userData) => {
        // Actualiza la UI con los nuevos datos
        userInfo.setUserInfo({
          name: userData.name,
          description: userData.about,
        });
        editProfilePopup.close();
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }
);

const editAvatarPopup = new PopupWithForm(
  SELECTORS.popups.editAvatar,
  (formData) => {
    return api.updateUserAvatar(formData)
      .then((userData) => {
        // Actualiza la img en el dom
        userInfo.setUserInfo({ avatar: userData.avatar });
        editAvatarPopup.close();
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }
);

const newPlacePopup = new PopupWithForm(
  SELECTORS.popups.newPlace,
  ({ title, imageUrl }) => {
    return api.addCard({ title, imageUrl })
      .then((newCard) => {
        const card = new Card(newCard,
          SELECTORS.gallery.cardTemplate,
          (data) => imagePopup.open(data),
          (isLiked, _id) => api.toggleLike(_id, isLiked),
          (_id, cardElement) => {
            deleteCardPopup.setCardData(_id, cardElement);
            deleteCardPopup.open();
          }
        );
        gallerySection.addItem(card.getView());
        newPlacePopup.close();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
);

const deleteCardPopup = new PopupWithConfirmation(
  SELECTORS.popups.deleteCard,
  (cardId, cardElement) => {
    api.deleteCard(cardId)
      .then(() => {
        cardElement.remove();
        deleteCardPopup.close();
      })
      .catch(error => {
        console.error('Error: ', error);
      });
  }
);

const imagePopup = new PopupWithImage(SELECTORS.popups.image);


// Event Listeners de popups
editProfilePopup.setEventListeners();
newPlacePopup.setEventListeners();
editAvatarPopup.setEventListeners();
imagePopup.setEventListeners();
deleteCardPopup.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: SELECTORS.profile.name,
  descriptionSelector: SELECTORS.profile.description,
  avatarSelector: SELECTORS.profile.avatar
});

// Event listeners
DOM.profile.editInfoButton.addEventListener("click", () => {
  const { name, description } = userInfo.getUserInfo();
  DOM.inputs.profileName.value = name;
  DOM.inputs.profileDescription.value = description;
  editProfilePopup.open();
});

DOM.profile.editAvatarButton.addEventListener("click", () => {
  DOM.inputs.avatarUrl.value = "";
  editAvatarPopup.open();
})

DOM.profile.addButton.addEventListener("click", () => {
  // Limpia los inputs del formulario de nuevo lugar
  DOM.inputs.placeTitle.value = "";
  DOM.inputs.placeImageUrl.value = "";
  newPlacePopup.open();
});

let gallerySection;
// Inicialización
function init() {
  // Validadores
  new FormValidator(validationConfig, DOM.forms.editProfile).enableValidation();
  new FormValidator(validationConfig, DOM.forms.newPlace).enableValidation();
  new FormValidator(validationConfig, DOM.forms.editAvatar).enableValidation();
  fetch("https://around-api.es.tripleten-services.com/v1/cards/", {
  headers: {
    authorization: "82bdebfc-6145-4c03-b430-768c5ddede6a"
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });
  loadUser()
    .then(() => {
      return getCards();
    })
    .then((cards) => {
      gallerySection = new Section(
        {
          items: cards,
          renderer: (item) => {
            const card = new Card(
              item,
              SELECTORS.gallery.cardTemplate,
              (data) => imagePopup.open(data),
              (isLiked, _id) => api.toggleLike(_id, isLiked),
              (_id, cardElement) => {
                deleteCardPopup.setCardData(_id, cardElement);
                deleteCardPopup.open();
              }
            );
            gallerySection.addItem(card.getView());
          },
        },
        SELECTORS.gallery.container
      );
      gallerySection.renderItems();
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
}

// Iniciar cuando el DOM este listo
document.addEventListener("DOMContentLoaded", init);

// Obtener info de usuario
function loadUser() {
  return api.getUserInfo()
    .then((userData) => {
      DOM.profile.name.textContent = userData.name;
      DOM.profile.description.textContent = userData.about;
      DOM.profile.avatar.src = userData.avatar;
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
}

// Obtener cards
function getCards() {
  return api.getInitialCards()
    .catch((error) => {
      console.error("Error: ", error);
      return []; // Regresa array vacio
    });
}
