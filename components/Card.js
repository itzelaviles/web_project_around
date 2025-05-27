export class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleLikeClick,
    _handleDeleteClick
  ) {
    this._title = data.title || data.name;
    this._imageUrl = data.imageUrl || data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick; // callback para likes
    this._isLiked = data.isLiked || false;
    this._id = data._id;
    this._handleDeleteClick = _handleDeleteClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".gallery-card")
      .cloneNode(true);
  }

  _setEventListeners() {
    // Like button
    this._likeButton = this._element.querySelector(".gallery-card__btn_like");

    this._likeButton.addEventListener("click", () => this._handleLike());

    // Delete button
    this._element
      .querySelector(".gallery-card__btn_trash")
      .addEventListener("click", () => this._handleDelete());

    // Image click
    this._element
      .querySelector(".gallery-card__image")
      .addEventListener("click", () =>
        this._handleCardClick({ title: this._title, imageUrl: this._imageUrl })
      );
  }

  _toggleLikeUI() {
    this._isLiked = !this._isLiked;
    this._likeButton.classList.toggle(
      "gallery-card__btn_like_active",
      this._isLiked
    );
  }

  _handleDelete() {
    this._handleDeleteClick(this._id, this._element);
  }

  _updateLikeState() {
    this._likeButton.classList.toggle(
      "gallery-card__btn_like_active",
      this._isLiked
    );
  }

  getView() {
    this._element = this._getTemplate();
    // Configurar imagen y titulo
    const cardImage = this._element.querySelector(".gallery-card__image");
    const cardTitle = this._element.querySelector(".gallery-card__title");
    cardImage.src = this._imageUrl;
    cardImage.alt = this._title;
    cardTitle.textContent = this._title;

    this._setEventListeners();
    this._updateLikeState();

    return this._element;
  }

  _handleLike() {
    this._toggleLikeUI();

    // callback para actualizar el like en la api
    this._handleLikeClick(this._isLiked, this._id)
      .then(() => {

      })
      .catch((error) => {
        console.error("Error al actualizar el like: ", error);
        this._toggleLikeUI(); // regresa a su estado sin like
      })
  }
}
