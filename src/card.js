import { toggleLike, uploadCard } from './api.js';
import { openViewModal, openDeleteCardConfirm } from './modal.js'
import { addCardToContainer } from './container.js';

const element = document.querySelector('#element').content
const cardSaveButton = document.querySelector('.popup__form-submit-create')

function handleImageClick(evt) {
    const { target: { src, alt } } = evt;
    openViewModal(src, alt);
};


function handleLikeClick(evt) {
    const card = evt.target.closest('.element')
    const likesCount = card.querySelector('.element__likes-count')
    toggleLike(card._id, card._likes.includes(card._userId))
        .then((res) => {
            card._likes = res.likes.map((item) => item._id)
            likesCount.textContent = card._likes.length
            if (card._likes.includes(card._userId)) {
                evt.target.classList.add('element__like_black')
            } else {
                evt.target.classList.remove('element__like_black')
            }
        })
}

function handleDeleteClick(evt) {
    const card = evt.target.closest('.element')
    sessionStorage.setItem('id-to-delete', card._id)
    openDeleteCardConfirm()
}


export function makeCard(cardObj, user_id) {
    const card = element.querySelector('.element').cloneNode(true)
    const elementPhoto = card.querySelector('.element__foto')
    card.querySelector('.element__title').textContent = cardObj.name
    const likesCount = card.querySelector('.element__likes-count')
    likesCount.textContent = cardObj.likes.length
    elementPhoto.src = cardObj.link
    elementPhoto.alt = cardObj.name
    const likeButton = card.querySelector('.element__like')
    const cardId = cardObj._id
    card._id = cardObj._id;
    card._userId = user_id;
    card._likes = cardObj.likes.map((item) => item._id)
    card._ownerId = cardObj.owner._id
    const trashButton = card.querySelector('.element__trash')
    if (cardObj.owner._id !== card._userId) {
        trashButton.classList.add('element__trash_inactive')
    }
    cardObj.likes.forEach(el => {
        if (el._id === card._userId) {
            likeButton.classList.add('element__like_black')
        }
    })
    trashButton.addEventListener('click', handleDeleteClick)

    const isLiked = cardObj.likes.map((item) => item._id).includes('362fa7fb4176231c9cf4f10d')

    likeButton.addEventListener('click', handleLikeClick)
    elementPhoto.addEventListener('click', handleImageClick)
    return card
}


export function addCard(card) {
    uploadCard(card)
        .then((res) => {
            addCardToContainer(makeCard(res, sessionStorage.getItem("userId")))
        })
        .finally(() => cardSaveButton.textContent = 'Создать')
}