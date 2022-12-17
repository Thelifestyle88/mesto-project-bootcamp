export function showInputError(formElement, inputElem, errMessage) {
    const errorElement = formElement.querySelector(`.${inputElem.id}-error`);
    inputElem.classList.add('popup__form-input_error');
    errorElement.textContent = errMessage
    errorElement.classList.add(`${inputElem.id}-error_active`);
};

export function hideInputError(formElement, inputElem) {
    const errorElement = formElement.querySelector(`.${inputElem.id}-error`);
    inputElem.classList.remove('popup__form-input_error');
    errorElement.classList.remove(`${inputElem.id}-error_active`);
    errorElement.textContent = ''
};

export function valid(formElement, inputElem) {
    if (!inputElem.validity.valid) {
        showInputError(formElement, inputElem, inputElem.validationMessage);
    } else {
        hideInputError(formElement, inputElem);
    }
};

export function hasInvalidInput(inputList) {
    return inputList.some((inputElem) => {
        return !inputElem.validity.valid
    })
}

export function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__form-submit_inactive');
        buttonElement.setAttribute('disabled', true)
    } else {
        buttonElement.classList.remove('popup__form-submit_inactive');
        buttonElement.removeAttribute('disabled', true)
    }
};

export function activeValid() {
    const formList = Array.from(document.querySelectorAll('.popup__form'))
    formList.forEach((formElem) => {
        setEventListeners(formElem)
    })
}
export function setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll('.popup__form-input'));
    const buttonElement = formElement.querySelector('.popup__form-submit');
    toggleButtonState(inputList, buttonElement)
    inputList.forEach((inputElem) => {
        inputElem.addEventListener('input', () => {
            valid(formElement, inputElem)
            toggleButtonState(inputList, buttonElement)
        })
    })
}