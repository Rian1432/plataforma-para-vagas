export function createCard (title, description) {
  const card = document.createElement('div')
  const cardBody = document.createElement('div')
  const cardTitle = document.createElement('h4')
  const cardDescription = document.createElement('div')
  const cardButtonContainer = document.createElement('div')

  card.setAttribute('class', 'card shadow rounded my-2')
  cardBody.setAttribute('class', 'card-body p-4')
  cardTitle.setAttribute('class', 'card-title border-b border-primary font-bold')
  cardDescription.setAttribute('class', 'card-text py-2 mb-2')
  cardButtonContainer.setAttribute('class', 'd-flex justify-content-end')

  cardTitle.textContent = title
  cardDescription.textContent = description

  card.appendChild(cardBody)
  cardBody.appendChild(cardTitle)
  cardBody.appendChild(cardDescription)
  cardButtonContainer.appendChild(createButton('Candidatar-se', 'btn btn-secondary text-white'))
  cardBody.appendChild(cardButtonContainer)


  const element = document.createElement('div')
  element.setAttribute('class', 'col-lg-4 col-md-6 col-12')
  element.appendChild(card)

  return element
}

export function createButton(text, styles) {
  const button = document.createElement('button')
  button.setAttribute('class', styles)
  button.textContent = text

  return button
}