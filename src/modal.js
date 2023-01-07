import { activeValid } from "./validate";
import { addCard } from "./card";
import { getProfileData, setUserData } from "./profile";
import { editProfile, changeAvatar, cardDelete } from "./api";

const cardPhoto = document.querySelector('.popup__foto')
const popupDescription = document.querySelector('.popup__description')
const popupImage = document.querySelector('.popup_image')
const placeFormTitleInput = document.querySelector('.popup__form-input_place-title');
const placeFormSubTitleInput = document.querySelector('.popup__form-input_place-subtitle');
const profileEditNameInput = document.querySelector('.popup__form-input_edit-title')
const profileEditAboutInput = document.querySelector('.popup__form-input_edit_subtitle')
const newPlaceForm = document.querySelector('.popup__form_create')
const profileEditForm = document.querySelector('.popup__form_edit')
const popupNewPlace = document.querySelector('.popup_new-place')
const popupCloseButtons = document.querySelectorAll('.popup__button-close')
const avatarForm = document.querySelector('.popup__avatar_form')
const popupProfileEdit = document.querySelector('.popup_profile_edit');
const avatarInput = document.querySelector('.popup__form-input_edit_avatar')
const avatarPopup = document.querySelector('.popup_avatar_edit')
const popupConfirmDelete = document.querySelector('.popup_delete')
const deleteForm = document.querySelector('.popup__form_delete')

export function openPopup(popup) {
    popup.classList.add('popup_opened')
    document.addEventListener('keyup', handleEscClick);
}

export function closePopup(popup) {
    popup.classList.remove('popup_opened')
    document.removeEventListener('keyup', handleEscClick);
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

function closePopupDeleteCard() {
    closePopup(popupConfirmDelete)
    sessionStorage.removeItem('id-to-delete');
}


function handleDeleteSubmitClick(evt) {
    evt.preventDefault()
    const itemToDelete = sessionStorage.getItem('id-to-delete')
    const deletedItem = Array.from(document.querySelectorAll('.element')).find(item => {
        return item._id == itemToDelete
    })
    cardDelete(itemToDelete)
        .then(() => {
            deletedItem.remove()
        })
    closePopupDeleteCard()
}

export function openDeleteCardConfirm() {
    if (sessionStorage.getItem('id-to-delete')) {
        openPopup(popupConfirmDelete)
    }
}

export function openEditAvatar() {
    cleanAvatarForm()
    openPopup(avatarPopup)
}

function cleanNewPlaceForm() {
    placeFormTitleInput.value = ''
    placeFormSubTitleInput.value = ''
}

function cleanAvatarForm() {
    avatarInput.value = ''
}

function getNewCardData() {
    const card = {}
    card.name = placeFormTitleInput.value
    card.link = placeFormSubTitleInput.value
    return card
}

function getNewProfileData() {
    const profile = {}
    profile.name = profileEditNameInput.value
    profile.about = profileEditAboutInput.value
    return profile
}


function getAvatar() {
    const avatar = avatarInput.value
    return avatar
}

function setProfileInputs(user) {
    profileEditNameInput.value = user.name
    profileEditAboutInput.value = user.about
}

export function openEditProfilePopup() {
    setProfileInputs(getProfileData())
    openPopup(popupProfileEdit)
}

function handleProfileSubmit(evt) {
    evt.preventDefault()
    editProfile(getNewProfileData())
        .then((profile) => {
            setUserData(profile)
        })
    closePopup(popupProfileEdit)
}

function handleProfileAvatar(evt) {
    evt.preventDefault()
    changeAvatar(getAvatar())
        .then(profile => setUserData(profile))
    cleanAvatarForm()
    closePopup(avatarPopup)
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
    avatarForm.addEventListener('submit', handleProfileAvatar)
    deleteForm.addEventListener('submit', handleDeleteSubmitClick)
    Array.from(document.querySelectorAll('.popup')).forEach((popup) => {
        popup.addEventListener('click', handleOverlayClick)
    });
    Array.from(popupCloseButtons).forEach((buttonClose) => {
        buttonClose.addEventListener('click', handleCloseClick)
    });
}
