import { Popup } from './Popup.js';
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popup.querySelector('.pop-up__img');
    this._imageTitle = this._popup.querySelector('.pop-up__img-title');
  }

  open({ title, imageUrl }) {
    this._imageElement.src = imageUrl;
    this._imageElement.alt = title;
    this._imageTitle.textContent = title;
    super.open();
  }
}