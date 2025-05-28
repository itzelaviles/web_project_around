import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".pop-up__form");
    this._inputList = this._form.querySelectorAll(".pop-up__input");

    this._submitButton = this._form.querySelector(".pop-up__btn_save");
    this._originalButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    const values = {};
    this._inputList.forEach((input) => {
      values[input.name] = input.value;
    });

    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.showLoading(true);

      this._handleFormSubmit(this._getInputValues())
        .then(() => {
          this.close();
        })
        .catch((error) => {
          console.error("Error: ", error);
          // Opcional: Mostrar mensaje de error al usuario
        })
        .finally(() => {
          this.showLoading(false);
        });
    });
  }

  showLoading(isLoading, message = "Guardando...") {
    if (isLoading) {
      this._submitButton.textContent = message;
      this._submitButton.disabled = true;
    } else {
      this._submitButton.textContent = this._originalButtonText;
      this._submitButton.disabled = false;
    }
  }

  close() {
    super.close();
    this._form.reset();
  }
}
