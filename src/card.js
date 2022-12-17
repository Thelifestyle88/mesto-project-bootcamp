const elements = document.querySelector('.elements')
const element = document.querySelector('#element').content
const popupDescription = document.querySelector('.popup__description')
const popupImage = document.querySelector('.popup_image')
const popupFoto = document.querySelector('.popup__foto')

import { openPopup } from './modal.js'

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

export { createCards }