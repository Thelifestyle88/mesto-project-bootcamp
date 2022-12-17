import '../pages/index.css';
const formNameInput = document.querySelector('.popup__form-input_edit-title');
const formDescriptionInput = document.querySelector('.popup__form-input_edit_subtitle');
const placeFormTitleInput = document.querySelector('.popup__form-input_place-title');
const placeFormSubTitleInput = document.querySelector('.popup__form-input_place-subtitle');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupCloseButtons = document.querySelectorAll('.popup__button-close')
const popupSaveButton = document.querySelector('.popup__form-submit-save');
const popupCreateButton = document.querySelector('.popup__form-submit-create');
const popupProfileEdit = document.querySelector('.popup_profile_edit');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popupNewPlace = document.querySelector('.popup_new-place')
const newPlaceButton = document.querySelector('.profile__add-button')
const popupImage = document.querySelector('.popup_image')
const popupFoto = document.querySelector('.popup__foto')
const popups = document.querySelectorAll('.popup')
const popupDescription = document.querySelector('.popup__description')
const elements = document.querySelector('.elements')
const element = document.querySelector('#element').content
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

import { openPopup, closePopup } from './modal.js'
import { activeValid } from './validate.js'

popupCloseButtons.forEach((elem) => {
    elem.addEventListener('click', function () {
        if (elem.parentNode.classList.contains('popup')) {
            const popup = elem.parentNode
            closePopup(popup)
        } else {
            const popup = elem.parentNode.parentNode
            closePopup(popup)
        }
    })
})

document.addEventListener('keyup', function (el) {
    const popupOpened = document.querySelector('.popup_opened')
    if (el.key === 'Escape' && popupOpened) {
        closePopup(popupOpened)
    }
})

popups.forEach((elem) => {
    elem.addEventListener('click', function (el) {
        if (el.target.classList.value.includes('popup_opened')) {
            closePopup(elem)
        }
    })
})

profileEditButton.addEventListener('click', function () {
    activeValid()
    openPopup(popupProfileEdit)
    formNameInput.value = profileTitle.textContent
    formDescriptionInput.value = profileSubtitle.textContent
});

newPlaceButton.addEventListener('click', function () {
    openPopup(popupNewPlace)
    activeValid()
})
popupSaveButton.addEventListener('click', function (e) {
    profileTitle.textContent = formNameInput.value
    profileSubtitle.textContent = formDescriptionInput.value
    e.preventDefault()
    closePopup(popupProfileEdit)
})

import { createCards } from './card'

popupCreateButton.addEventListener('click', function (e) {
    const name = placeFormTitleInput.value
    const source = placeFormSubTitleInput.value
    createCards(name, source)
    e.preventDefault()
    closePopup(popupNewPlace)
})

initialCards.forEach(elem => {
    const name = elem.name
    const link = elem.link
    createCards(name, link)
})
