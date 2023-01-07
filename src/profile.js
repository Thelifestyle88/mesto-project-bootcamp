const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileAvatar = document.querySelector('.profile__image')

export function getProfileData() {
    const name = profileTitle.textContent
    const about = profileSubtitle.textContent
    return { name, about }
}

export function setUserData(user) {
    profileTitle.textContent = user.name
    profileSubtitle.textContent = user.about
    profileAvatar.src = user.avatar
}