import $ from 'jquery'

export function cardComponent (title, description, type = 'show') {
  const card = $('<div></div>')
  const cardBody = $('<div></div>')
  const cardTitle = $(`<h4>${title}</h4>`)
  const cardDescription = $(`<div>${description}</div>`)

  $(card).addClass('card shadow rounded my-2')
  $(cardBody).addClass('card-body p-4')
  $(cardTitle).addClass('card-title border-b border-primary font-bold')
  $(cardDescription).addClass('card-text py-2 mb-2')

  card.append(cardBody)
  cardBody.append(cardTitle)
  cardBody.append(cardDescription)

  if(type === 'show') {
    const cardButtonContainer = $('<div></div>')
    cardButtonContainer.append(createButton('Candidatar-se', 'btn btn-secondary text-white'))
    $(cardButtonContainer).addClass('d-flex justify-content-end')
    cardBody.append(cardButtonContainer)
  }

  return $('<div></div>').addClass('col-lg-4 col-md-6 col-12').append(card)
}

export function createButton(text, styles) {
  const button = $(`<button>${text}</button>`)
  button.addClass(styles)

  return button
}