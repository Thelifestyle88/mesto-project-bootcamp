import { openPopup } from "./modal";
import { editProfile, changeAvatar } from "./api";
import { closePopup } from "./modal";
import { data } from "autoprefixer";
const formNameInput = document.querySelector('.popup__form-input_edit-title');
const formDescriptionInput = document.querySelector('.popup__form-input_edit_subtitle');
const popupProfileEdit = document.querySelector('.popup_profile_edit');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileAvatar = document.querySelector('.profile__image')
const avatarPopup = document.querySelector('.popup_avatar_edit')
const avatarInput = document.querySelector('.popup__form-input_edit_avatar')

function getProfileData() {
    const profile = {}
    profile.name = formNameInput.value
    profile.about = formDescriptionInput.value
    profileTitle.textContent = formNameInput.value
    profileSubtitle.textContent = formDescriptionInput.value
    return profile
}

export function setInputsData(user) {
    profileTitle.textContent = user.name
    profileSubtitle.textContent = user.about
    profileAvatar.src = user.avatar
    formNameInput.value = user.name
    formDescriptionInput.value = user.about
}

export function openEditProfilePopup() {
    openPopup(popupProfileEdit)
}

export function handleProfileSubmit(evt) {
    evt.preventDefault()
    editProfile(getProfileData())
    closePopup(popupProfileEdit)
}

function cleanAvatarForm() {
    avatarInput.value = ''
}

export function openEditAvatar() {
    cleanAvatarForm()
    openPopup(avatarPopup)
}

function getAvatar() {
    const avatar = avatarInput.value
    return avatar
}

export function handleProfileAvater(evt) {
    evt.preventDefault()
    changeAvatar(getAvatar())
    closePopup(avatarPopup)
}