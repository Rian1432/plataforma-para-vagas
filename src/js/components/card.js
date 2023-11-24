export function createCard (title, description) {
  const card = document.createElement('div')
  const cardBody = document.createElement('div')
  const cardTitle = document.createElement('h4')
  const cardDescription = document.createElement('div')

  card.setAttribute('class', 'card shadow rounded col-lg-4 m-2')
  cardBody.setAttribute('class', 'card-body p-4')
  cardTitle.setAttribute('class', 'card-title border-b border-primary font-bold')
  cardDescription.setAttribute('class', 'card-text py-2')

  cardTitle.textContent = title
  cardDescription.textContent = description

  card.appendChild(cardBody)
  cardBody.appendChild(cardTitle)
  cardBody.appendChild(cardDescription)
  cardBody.appendChild(createButton('Candidatar-se'))

  return card
}

export function createButton(text) {
  const button = document.createElement('button')
  button.setAttribute('class', 'btn btn-primary mt-3')
  button.textContent = text

  return button
}