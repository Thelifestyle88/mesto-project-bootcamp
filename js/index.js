const formTitleInput = document.querySelectorAll('.popup__form-input-title');
const formSubTitleInput = document.querySelectorAll('.popup__form-input-subtitle');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelectorAll('.popup__button-close')
const popupSubmitButton = document.querySelectorAll('.popup__form-submit');
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
let initialCards = [
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

createCard(initialCards)
let likeButton = document.querySelectorAll('.element__like')
let trashButton = document.querySelectorAll('.element__trash')


function openPopup(popup) {
    popup.classList.add('popup_opened')
}

function closePopup(popup) {
    popup.classList.remove('popup_opened')
}

popupCloseButton.forEach((elem) => {
    elem.addEventListener('click', function () {
        popup = elem.parentNode
        closePopup(popup)
    })
})

function getForm() {
    let currentTitle = document.querySelector('.popup_opened').childNodes[3][0]
    let currentSubtitle = document.querySelector('.popup_opened').childNodes[3][1]
    currentTitle.value = profileTitle.textContent
    currentSubtitle.value = profileSubtitle.textContent
}

function submitForm() {
    let currentTitle = document.querySelector('.popup_opened').childNodes[3][0]
    let currentSubtitle = document.querySelector('.popup_opened').childNodes[3][1]
    profileTitle.textContent = currentTitle.value
    profileSubtitle.textContent = currentSubtitle.value
}

profileEditButton.addEventListener('click', function () {
    openPopup(popupProfileEdit)
    getForm()
});

newPlaceButton.addEventListener('click', function () {
    openPopup(popupNewPlace)
})

popupSubmitButton.forEach(elem => {
    elem.addEventListener('click', function (e) {
        if (elem.parentNode.parentNode.classList.value === 'popup popup_profile_edit popup_opened') {
            submitForm()
            e.preventDefault()
            closePopup(popupProfileEdit)
        }
        else if (elem.parentNode.parentNode.classList.value === 'popup popup_new-place popup_opened') {
            addCard()
            createCard(initialCards)
            e.preventDefault()
            closePopup(popupNewPlace)
        }
        e.preventDefault()
    })
})

function addCard() {
    let currentTitle = document.querySelector('.popup_opened').childNodes[3][0]
    let currentSubtitle = document.querySelector('.popup_opened').childNodes[3][1]
    initialCards.push({
        name: currentTitle.value,
        link: currentSubtitle.value
    }
    )
    console.log(initialCards)
}

function createCard(initialCards) {
    initialCards.forEach((elem) => {
        const elementPlace = element.querySelector('.element').cloneNode(true)
        elementPlace.querySelector('.element__foto').src = elem.link
        elementPlace.querySelector('.element__title').textContent = elem.name
        elements.prepend(elementPlace)
    })
}

likeButton.forEach(elem => {
    elem.addEventListener('click', function (el) {
        el.target.classList.toggle('element__like_black')
    })
})

trashButton.forEach(elem => {
    elem.addEventListener('click', function () {
        elem.parentNode.remove()
    })
})


let currentElements = document.querySelectorAll('.element')
currentElements.forEach(elem => {
    elem.addEventListener('click', function () {
        popupDescription.textContent = elem.textContent
    })
})
let elementFoto = document.querySelectorAll('.element__foto')
elementFoto.forEach(elem => {
    elem.addEventListener('click', function () {
        popupFoto.src = elem.src
        openPopup(popupImage)
    })
})


