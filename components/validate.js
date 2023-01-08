const settings = {
    inputError: 'popup__form-input_error',
    errorActive: '-error_active',
    errorInactive: 'popup__form-submit_inactive',
    error: '-error',
    cleanString: ''
}

function showInputError(formElement, inputElem, errMessage) {
    const errorElement = formElement.querySelector(`.${inputElem.id}${settings.error}`);
    inputElem.classList.add(settings.inputError);
    errorElement.textContent = errMessage
    errorElement.classList.add(`${inputElem.id}${settings.errorActive}`);
};

function hideInputError(formElement, inputElem) {
    const errorElement = formElement.querySelector(`.${inputElem.id}${settings.error}`);
    inputElem.classList.remove(settings.inputError);
    errorElement.classList.remove(`${inputElem.id}${settings.errorActive}`);
    errorElement.textContent = settings.cleanString
};

function valid(formElement, inputElem) {
    if (!inputElem.validity.valid) {
        showInputError(formElement, inputElem, inputElem.validationMessage);
    } else {
        hideInputError(formElement, inputElem);
    }
};

function hasInvalidInput(inputList) {
    return inputList.some((inputElem) => {
        return !inputElem.validity.valid
    })
}

export function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(settings.errorInactive);
        buttonElement.setAttribute('disabled', true)
    } else {
        buttonElement.classList.remove(settings.errorInactive);
        buttonElement.removeAttribute('disabled', true)
    }
};

export function enableValidation() {
    const formList = Array.from(document.querySelectorAll('.popup__form'))
    formList.forEach((formElem) => {
        setEventListeners(formElem)
    })
}
function setEventListeners(formElement) {
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


export function resetValidation(formElement) {
    const inputList = Array.from(formElement.querySelectorAll('.popup__form-input'));
    const buttonElement = formElement.querySelector('.popup__form-submit');
    inputList.forEach((inputElem) => {
        valid(formElement, inputElem)
        hideInputError(formElement, inputElem)
    })
    toggleButtonState(inputList, buttonElement)
}
