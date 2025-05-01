export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._title = data.title;
    this._imageUrl = data.imageUrl;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector(".gallery-card")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._element
      .querySelector(".gallery-card__btn_like")
      .addEventListener("click", () => this._handleLike());

    this._element
      .querySelector(".gallery-card__btn_trash")
      .addEventListener("click", () => this._handleDelete());

    this._element
      .querySelector(".gallery-card__image")
      .addEventListener("click", () =>
        this._handleCardClick({ title: this._title, imageUrl: this._imageUrl })
      );
  }

  _handleLike() {
    this._element
      .querySelector(".gallery-card__btn_like")
      .classList.toggle("gallery-card__btn_like_active");
  }

  _handleDelete() {
    this._element.remove();
    this._element = null;
  }

  getView() {
    this._element = this._getTemplate();
    const cardImage = this._element.querySelector(".gallery-card__image");
    const cardTitle = this._element.querySelector(".gallery-card__title");

    cardImage.src = this._imageUrl;
    cardImage.alt = this._title;
    cardTitle.textContent = this._title;

    this._setEventListeners();

    return this._element;
  }
}