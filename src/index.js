import '../pages/index.css';
import { openNewPlacePopup, setModalsEventListeners } from './modal.js'
import { activeValid } from './validate.js'
import { getProfile, getCards } from './api.js';
import { makeCard } from './card';
import { addCardToContainer } from './container';
import { openEditProfilePopup, setInputsData, openEditAvatar } from './profile';

const profileEditButton = document.querySelector('.profile__edit-button');
const newPlaceButton = document.querySelector('.profile__add-button')
const avatarEdit = document.querySelector('.profile__avatar')

Promise.all([getProfile(), getCards()])
    .then(([user, cards]) => {
        setInputsData(user)
        sessionStorage.setItem('userId', user._id)
        cards.forEach((item) => addCardToContainer(makeCard(item, user._id)))
    })
    .catch(console.dir());

activeValid()
setModalsEventListeners()

profileEditButton.addEventListener('click', openEditProfilePopup);

newPlaceButton.addEventListener('click', openNewPlacePopup);

avatarEdit.addEventListener('click', openEditAvatar);