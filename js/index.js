const editFormTitleInput = document.querySelector('.popup__form-input_edit-title');
const editFormSubTitleInput = document.querySelector('.popup__form-input_edit_subtitle');
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
const popupDescription = document.querySelector('.popup__description')
const elements = document.querySelector('.elements')
const element = document.querySelector('#element').content
const elementTitle = document.querySelector('.element__title')
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

function openPopup(popup) {
    popup.classList.add('popup_opened')
}

function closePopup(popup) {
    popup.classList.remove('popup_opened')
}

popupCloseButtons.forEach((elem) => {
    elem.addEventListener('click', function () {
        popup = elem.parentNode
        closePopup(popup)
    })
})

profileEditButton.addEventListener('click', function () {
    openPopup(popupProfileEdit)
    editFormTitleInput.value = profileTitle.textContent
    editFormSubTitleInput.value = profileSubtitle.textContent
});

newPlaceButton.addEventListener('click', function () {
    openPopup(popupNewPlace)
})
popupSaveButton.addEventListener('click', function (e) {
    profileTitle.textContent = editFormTitleInput.value
    profileSubtitle.textContent = editFormSubTitleInput.value
    e.preventDefault()
    closePopup(popupProfileEdit)
})

function createCards(elementName, elementSource) {
    const card = element.querySelector('.element').cloneNode(true)
    card.querySelector('.element__title').textContent = elementName
    card.querySelector('.element__foto').src = elementSource
    card.querySelector('.element__foto').alt = elementName
    const likeButton = card.querySelector('.element__like')
    const trashButton = card.querySelector('.element__trash')
    const elementFoto = card.querySelector('.element__foto')
    likeButton.addEventListener('click', function (el) {
        el.target.classList.toggle('element__like_black')
    })
    trashButton.addEventListener('click', function (element) {
        element.target.parentNode.parentNode.remove()
    })
    elementFoto.addEventListener('click', function (elem) {
        popupFoto.src = elem.target.src
        popupFoto.alt = elem.target.alt
        popupDescription.textContent = elem.target.alt
        openPopup(popupImage)
    })
    elements.prepend(card)
}

popupCreateButton.addEventListener('click', function (e) {
    let name = placeFormTitleInput.value
    let source = placeFormSubTitleInput.value
    createCards(name, source)
    e.preventDefault()
    closePopup(popupNewPlace)
})

initialCards.forEach(elem => {
    const name = elem.name
    const link = elem.link
    createCards(name, link)
})