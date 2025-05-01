export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this); //bind para mantener el contexto
  }

  open() {
    this._popup.classList.add("pop-up_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("pop-up_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    // Cerrar al hacer clic en el boton de cerrar
    this._popup
      .querySelector(".pop-up__btn_close")
      .addEventListener("click", () => this.close());

    // Cerrar al hacer clic en el overlay
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target === this._popup) {
        this.close();
      }
    })
  }
}
