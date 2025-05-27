import { Popup } from './Popup.js';

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.pop-up__form');
    this._submitButton = this._popup.querySelector('.pop-up__btn_save');
    this._originalButtonText = this._submitButton.textContent;
  }

  // Establece los datos de la tarjeta a eliminar
  setCardData(cardId, cardElement) {
    this._cardId = cardId;
    this._cardElement = cardElement;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._cardId, this._cardElement);
    });
  }

  // Método para resetear el popup
  reset() {
    this._cardId = null;
    this._cardElement = null;
  }
}