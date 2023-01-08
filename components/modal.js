import { resetValidation } from "./validate";
import { addCard } from "./card";
import { getProfileData, setUserData } from "./profile";
import { api } from "./api";

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
const profileSaveButton = document.querySelector('.popup__form-submit-save')
const avatarSaveButton = document.querySelector('.popup__form-submit-avatar')
const cardSaveButton = document.querySelector('.popup__form-submit-create')

export function openPopup(popup) {
    popup.classList.add('popup_opened')
    document.addEventListener('keyup', handleEsc);
}

export function closePopup(popup) {
    popup.classList.remove('popup_opened')
    document.removeEventListener('keyup', handleEsc);
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

export function setButtonText(button, buttonText = "Сохранить") {
    button.textContent = buttonText;
}

function handleEsc(evt) {
    if (evt.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened')
        popupOpened && closePopup(popupOpened)
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
    sessionStorage.removeItem('itemToDelete');
}


function handleDeleteSubmitClick(evt) {
    evt.preventDefault()
    const itemToDelete = sessionStorage.getItem('itemToDelete')
    const deletedItem = document.getElementById(itemToDelete)
    api.cardDelete(itemToDelete)
        .then(() => {
            deletedItem.remove()
            closePopupDeleteCard()
        })
        .catch(console.error)
}

export function openDeleteCardConfirm() {
    if (sessionStorage.getItem('itemToDelete')) {
        openPopup(popupConfirmDelete)
    }
}

export function openEditAvatar() {
    cleanAvatarForm()
    resetValidation(avatarForm)
    openPopup(avatarPopup)
}

export function cleanNewPlaceForm() {
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
    resetValidation(profileEditForm)
    openPopup(popupProfileEdit)
}

function handleProfileSubmit(evt) {
    evt.preventDefault()
    setButtonText(profileSaveButton, 'Cохранение...')
    api.editProfile(getNewProfileData())
        .then((profile) => {
            setUserData(profile)
            closePopup(popupProfileEdit)
        })
        .catch(console.error)
        .finally(() => profileSaveButton.textContent = 'Сохранить')
}

function handleProfileAvatar(evt) {
    evt.preventDefault()
    setButtonText(avatarSaveButton, 'Cохранение...')
    api.changeAvatar(getAvatar())
        .then(profile => {
            setUserData(profile)
            cleanAvatarForm()
            closePopup(avatarPopup)
        })
        .catch(console.error)
        .finally(() => setButtonText(avatarSaveButton))
}

export function openNewPlacePopup() {
    cleanNewPlaceForm()
    resetValidation(newPlaceForm)
    openPopup(popupNewPlace)
}

function handleNewPlaceSubmit(evt) {
    evt.preventDefault()
    setButtonText(cardSaveButton, 'Cохранение...')
    api.uploadCard(getNewCardData())
        .then((res) => {
            addCard(res)
            closePopup(popupNewPlace)
            cleanNewPlaceForm()
        })
        .catch(console.error)
        .finally(() => setButtonText(cardSaveButton))
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
