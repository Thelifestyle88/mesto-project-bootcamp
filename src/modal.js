import { activeValid } from "./validate";
import { addCard } from "./card";
import { handleProfileSubmit, handleProfileAvater } from "./profile";

const cardPhoto = document.querySelector('.popup__foto')
const popupDescription = document.querySelector('.popup__description')
const popupImage = document.querySelector('.popup_image')
const placeFormTitleInput = document.querySelector('.popup__form-input_place-title');
const placeFormSubTitleInput = document.querySelector('.popup__form-input_place-subtitle');
const newPlaceForm = document.querySelector('.popup__form_create')
const profileEditForm = document.querySelector('.popup__form_edit')
const popupNewPlace = document.querySelector('.popup_new-place')
const popupCloseButtons = document.querySelectorAll('.popup__button-close')
const avatarForm = document.querySelector('.popup__avatar_form')

export function openPopup(popup) {
    popup.classList.add('popup_opened')
}

export function closePopup(popup) {
    popup.classList.remove('popup_opened')
}

function handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
        closePopup(evt.target);
    };
};

function handleCloseClick(elem) {
    const popup = elem.target.closest('.popup')
    closePopup(popup)
}

function handleEscClick(evt) {
    const popupOpened = document.querySelector('.popup_opened')
    if (evt.key === 'Escape' && popupOpened) {
        closePopup(popupOpened)
    }
}

export function openViewModal(src, alt) {
    cardPhoto.src = src
    cardPhoto.alt = alt
    popupDescription.textContent = alt
    openPopup(popupImage)
};

function cleanNewPlaceForm() {
    placeFormTitleInput.value = ''
    placeFormSubTitleInput.value = ''
}

function getNewCardData() {
    const card = {}
    card.name = placeFormTitleInput.value
    card.link = placeFormSubTitleInput.value
    return card
}

export function openNewPlacePopup() {
    cleanNewPlaceForm()
    activeValid()
    openPopup(popupNewPlace)
}

function handleNewPlaceSubmit(evt) {
    evt.preventDefault()
    addCard(getNewCardData())
    closePopup(popupNewPlace)
    cleanNewPlaceForm()
}

export function setModalsEventListeners() {

    newPlaceForm.addEventListener('submit', handleNewPlaceSubmit)
    profileEditForm.addEventListener('submit', handleProfileSubmit)
    avatarForm.addEventListener('submit', handleProfileAvater)
    Array.from(document.querySelectorAll('.popup')).forEach((popup) => {
        popup.addEventListener('click', handleOverlayClick)
    });
    Array.from(popupCloseButtons).forEach((buttonClose) => {
        buttonClose.addEventListener('click', handleCloseClick)
    });
    document.addEventListener('keyup', handleEscClick);
}