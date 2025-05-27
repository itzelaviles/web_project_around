import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { UserInfo } from "../components/UserInfo.js";
import {
  SELECTORS,
  initialCards,
  validationConfig,
} from "../utils/constants.js";

const API_CONFIG = {
  BASE_URL: "https://around-api.es.tripleten-services.com/v1",
  TOKEN: "82bdebfc-6145-4c03-b430-768c5ddede6a",
};

// Cachear elementos del DOM reutilizados
const DOM = {
  forms: {
    editProfile: document.querySelector(SELECTORS.forms.editProfile),
    newPlace: document.querySelector(SELECTORS.forms.newPlace),
  },
  inputs: {
    profileName: document.querySelector(SELECTORS.inputs.profileName),
    profileDescription: document.querySelector(
      SELECTORS.inputs.profileDescription
    ),
    placeTitle: document.querySelector(SELECTORS.inputs.placeTitle),
    placeImageUrl: document.querySelector(SELECTORS.inputs.placeImageUrl),
  },
  profile: {
    name: document.querySelector(SELECTORS.profile.name),
    description: document.querySelector(SELECTORS.profile.description),
    avatar: document.querySelector(SELECTORS.profile.avatar),
    editButton: document.querySelector(SELECTORS.profile.editButton),
    addButton: document.querySelector(SELECTORS.profile.addButton),
  },
};

// modificar perfil
const editProfilePopup = new PopupWithForm(
  SELECTORS.popups.editProfile,
  (formData) => {
    fetch(`${API_CONFIG.BASE_URL}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: API_CONFIG.TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        about: formData.description,
      }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error al actualizar");
        return response.json();
      })
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

const newPlacePopup = new PopupWithForm(
  SELECTORS.popups.newPlace,
  ({ title, imageUrl }) => {
    fetch(`${API_CONFIG.BASE_URL}/cards`, {
      method: "POST",
      headers: {
        authorization: API_CONFIG.TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: title,
        link: imageUrl,
      }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error al crear tarjeta");
        return response.json();
      })
      .then((newCard) => {
        const card = new Card(newCard,
          SELECTORS.gallery.cardTemplate,
          (data) => imagePopup.open(data),
          (isLiked, _id) => toggleLike(newCard._id, isLiked),
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

// Crea la instancia del popup de confirmación
const deleteCardPopup = new PopupWithConfirmation(
  SELECTORS.popups.deleteCard, // Selector del popup
  (cardId, cardElement) => { // handleFormSubmit
    // Mostrar estado de "cargando"
    // deleteCardPopup.showLoading(true);

    // Hacer la petición DELETE a la API
    fetch(`${API_CONFIG.BASE_URL}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: API_CONFIG.TOKEN,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) throw new Error('Error al eliminar tarjeta');
        cardElement.remove();
        deleteCardPopup.close();
      })
      .catch(error => {
        console.error('Error:', error);
      })
      .finally(() => {
        // // Restaurar el texto original del botón
        // deleteCardPopup.showLoading(false);
      });
  }
);

// No olvides establecer los event listeners
deleteCardPopup.setEventListeners();

const imagePopup = new PopupWithImage(SELECTORS.popups.image);

editProfilePopup.setEventListeners();
newPlacePopup.setEventListeners();
imagePopup.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: SELECTORS.profile.name,
  descriptionSelector: SELECTORS.profile.description,
});

// Event listeners
DOM.profile.editButton.addEventListener("click", () => {
  const { name, description } = userInfo.getUserInfo();
  DOM.inputs.profileName.value = name;
  DOM.inputs.profileDescription.value = description;
  editProfilePopup.open();
});

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
              (isLiked, _id) => toggleLike(item._id, isLiked),
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

// Iniciar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", init);

// Obtener info de usuario
function loadUser() {
  return fetch(`${API_CONFIG.BASE_URL}/users/me`, {
    headers: {
      authorization: API_CONFIG.TOKEN,
      "Content-Type": "application/json", //Buena practica para APIs REST
    },
  })
    .then((response) => {
      if (!response.ok) throw new Error("Error en la petición");
      return response.json(); // Parsea la respuesta a JSON
    })
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
  return fetch(`${API_CONFIG.BASE_URL}/cards?`, {
    headers: {
      authorization: API_CONFIG.TOKEN,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) throw new Error("Error en la petición");
      return response.json(); // Parsea la respuesta a JSON
    })
    .catch((error) => {
      console.error("Error: ", error);
      return []; // Regresa array vacio
    });
}

function toggleLike(cardId, isLiked) {
  const method = isLiked ? 'PUT' : 'DELETE';
  return fetch(`${API_CONFIG.BASE_URL}/cards/${cardId}/likes`, {
    method: method,
    headers: {
      authorization: API_CONFIG.TOKEN,
      "Content-Type": "application/json",
    },
  })
  .then((response) => {
    if (!response.ok) throw new Error("Error al actualizar like");
    return response.json();
  })
  .catch((error) => {
    console.error("Error:", error);
    throw error; // Propaga el error para manejarlo en Card.js
  });
}