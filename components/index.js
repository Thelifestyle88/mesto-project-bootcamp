import '../src/pages/index.css';
import { openNewPlacePopup, setModalsEventListeners, openEditProfilePopup, openEditAvatar } from './modal.js'
import { enableValidation } from './validate.js'
import { api } from './api.js';
import { makeCard } from './card';
import { addCardToContainer } from './container';
import { setUserData } from './profile';

const profileEditButton = document.querySelector('.profile__edit-button');
const newPlaceButton = document.querySelector('.profile__add-button')
const avatarEdit = document.querySelector('.profile__avatar')

Promise.all([api.getProfile(), api.getCards()])
    .then(([user, cards]) => {
        setUserData(user)
        sessionStorage.setItem('userId', user._id)
        cards.forEach((item) => addCardToContainer(makeCard(item, user._id)))
    })
    .catch(console.error);

enableValidation()
setModalsEventListeners()

profileEditButton.addEventListener('click', openEditProfilePopup);

newPlaceButton.addEventListener('click', openNewPlacePopup);

avatarEdit.addEventListener('click', openEditAvatar);