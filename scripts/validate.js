const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("pop-up__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("pop-up__input-error_active");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("pop-up__input_type_error");
  errorElement.classList.remove("pop-up__input-error_active");
  errorElement.textContent = "";
};

// Checks if input is valid or not
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("pop-up__btn_disabled");
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove("pop-up__btn_disabled");
    buttonElement.disabled = false;
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".pop-up__input"));
  const buttonElement = formElement.querySelector(".pop-up__btn_save");
  // prevent opening editprofile popup with button disabled
  if (formElement.id != "edit-profile-form") {
    toggleButtonState(inputList, buttonElement);
  }

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".pop-up__form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

function resetValidation(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".pop-up__input"));
  inputList.forEach((inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove("pop-up__input_type_error");
    errorElement.textContent = "";
    errorElement.classList.remove("pop-up__input-error_active");
  });
}

export { enableValidation, resetValidation };
