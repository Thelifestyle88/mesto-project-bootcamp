const config = {
    baseUrl: 'https://nomoreparties.co/v1/wbf-cohort-3/',
    header: {
        authorization: '9035a3ae-3144-4c5d-a2fb-c77d4c0cdff6'
    }
}

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return res.json()
        .then((err) => {
            err.statusCode = res.status
            return Promise.reject(err);
        })
}


export function getProfile() {
    return fetch(`${config.baseUrl}users/me`, {
        method: 'GET',
        headers: config.header

    })
        .then(checkResponse)
}


export function toggleLike(cardId, isLiked) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: isLiked ? 'DELETE' : 'PUT',
        headers: config.header
    })
        .then(checkResponse)
}


export function uploadCard(card) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: {
            authorization: '9035a3ae-3144-4c5d-a2fb-c77d4c0cdff6',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            card
        )

    })
        .then(checkResponse)
}

export function editProfile(profile) {
    return fetch(`${config.baseUrl}users/me`, {
        method: 'PATCH',
        headers: {
            authorization: '9035a3ae-3144-4c5d-a2fb-c77d4c0cdff6',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            profile
        )
    })
        .then(checkResponse)

}

export function getCards() {
    return fetch(`${config.baseUrl}cards`, {
        method: 'GET',
        headers: config.header
    })
        .then(checkResponse)
}

export function cardDelete(cardId) {

    return fetch(`${config.baseUrl}cards/${cardId}`, {
        method: 'DELETE',
        headers: config.header
    })
        .then(checkResponse)
}

export function changeAvatar(link) {
    return fetch(`${config.baseUrl}users/me/avatar`, {
        method: 'PATCH',
        headers: {
            authorization: '9035a3ae-3144-4c5d-a2fb-c77d4c0cdff6',
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            avatar: `${link}`
        })
    })
        .then(checkResponse)
}