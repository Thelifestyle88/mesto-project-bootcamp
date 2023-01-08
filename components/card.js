import { api } from './api.js';
import { openViewModal, openDeleteCardConfirm } from './modal.js'
import { addCardToContainer } from './container.js';

const element = document.querySelector('#element').content

function handleImageClick(evt) {
    const { target: { src, alt } } = evt;
    openViewModal(src, alt);
};


function handleLikeClick(evt) {
    const card = evt.target.closest('.element')
    const likesCount = card.querySelector('.element__likes-count')
    api.toggleLike(card.id, card._likes.includes(card._userId))
        .then((res) => {
            card._likes = res.likes.map((item) => item._id)
            likesCount.textContent = card._likes.length
            if (card._likes.includes(card._userId)) {
                evt.target.classList.add('element__like_black')
            } else {
                evt.target.classList.remove('element__like_black')
            }
        })
        .catch(console.error);
}

function handleDeleteClick(evt) {
    const card = evt.target.closest('.element')
    sessionStorage.setItem('itemToDelete', card.id)
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
    card.id = cardObj._id;
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
    likeButton.addEventListener('click', handleLikeClick)
    elementPhoto.addEventListener('click', handleImageClick)
    return card
}


export function addCard(card) {
    addCardToContainer(makeCard(card, sessionStorage.getItem("userId")))
}