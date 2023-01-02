const elements = document.querySelector('.elements')

export function addCardToContainer(cardNode) {
    elements.prepend(cardNode)
}