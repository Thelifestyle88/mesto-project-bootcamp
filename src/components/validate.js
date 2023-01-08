function showInputError(formElement, inputElem, errMessage, { error, inputError, errorActive }) {
    const errorElement = formElement.querySelector(`.${inputElem.id}${error}`);
    inputElem.classList.add(inputError);
    errorElement.textContent = errMessage
    errorElement.classList.add(`${inputElem.id}${errorActive}`);
};

function hideInputError(formElement, inputElem, { error, inputError, errorActive, cleanString }) {
    const errorElement = formElement.querySelector(`.${inputElem.id}${error}`);
    inputElem.classList.remove(inputError);
    errorElement.classList.remove(`${inputElem.id}${errorActive}`);
    errorElement.textContent = cleanString
};

function valid(formElement, inputElem, { error, inputError, errorActive, cleanString }) {
    if (!inputElem.validity.valid) {
        showInputError(formElement, inputElem, inputElem.validationMessage, { error, inputError, errorActive });
    } else {
        hideInputError(formElement, inputElem, { error, inputError, errorActive, cleanString });
    }
};

function hasInvalidInput(inputList) {
    return inputList.some((inputElem) => {
        return !inputElem.validity.valid
    })
}

export function toggleButtonState(inputList, buttonElement, { errorInactive, disable }) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(errorInactive);
        buttonElement.setAttribute(disable, true)
    } else {
        buttonElement.classList.remove(errorInactive);
        buttonElement.removeAttribute(disable, true)
    }
};

export function enableValidation({ formSelector, inputSelector, submitButtonSelector, inputError, errorActive, errorInactive, error, cleanString, disable }) {
    const formList = Array.from(document.querySelectorAll(formSelector))
    formList.forEach((formElem) => {
        setEventListeners(formElem, { inputSelector, submitButtonSelector, inputError, errorActive, errorInactive, error, cleanString, disable })
    })
}
function setEventListeners(formElement, { inputSelector, submitButtonSelector, inputError, errorActive, errorInactive, error, cleanString, disable }) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector))
    const buttonElement = formElement.querySelector(submitButtonSelector)
    toggleButtonState(inputList, buttonElement, { errorInactive, disable })
    inputList.forEach((inputElem) => {
        inputElem.addEventListener('input', () => {
            valid(formElement, inputElem, { error, inputError, errorActive, cleanString })
            toggleButtonState(inputList, buttonElement, { errorInactive, disable })
        })
    })
}


export function resetValidation(formElement, { inputSelector, submitButtonSelector, inputError, errorActive, errorInactive, error, cleanString, disable }) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    inputList.forEach((inputElem) => {
        valid(formElement, inputElem, { error, inputError, errorActive, cleanString })
        hideInputError(formElement, inputElem, { error, inputError, errorActive, cleanString });
    })
    toggleButtonState(inputList, buttonElement, { errorInactive, disable })
}
