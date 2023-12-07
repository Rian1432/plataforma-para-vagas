import { HttpClient } from '../shared/HttpClient.js'
import { logout, isAuthenticated, showNotify } from '../shared/global.js'
import $ from 'jquery'
import 'jquery.cookie'
import 'bootstrap'

$(document).ready(isAuthenticated)

const user = JSON.parse($.cookie('User'))
const fetchApi = new HttpClient()
const isRecruiter = user.role === 'recruiter'

$('.user-name').text(`Olá, ${user.name}`)
$('.exit').on('click', logout)

if(user.role === 'recruiter'){
  showCreateButton()
  $('#title').text('Minhas vagas')
}


function showCreateButton() {
  const btn = $('<a href="./form.html" class="btn btn-outline-secondary">Criar vaga</a>')
  $('#create-btn-container').append(btn)
}

function getJobs() {
  const route = !isRecruiter 
    ? '/jobs?_limit=9' 
    : `/jobs?_limit=9&recruiterId=${user.id}`

  fetchApi.get(route)
    .then((response) => {
      if(!response.ok) {
        throw new Error('Oops, Houve algo de errado!')
      }
      return response.json()
    })
    .then((response) => {
      if(isRecruiter) {
        response.forEach(job => {
          $('#jobs').append(createCard(job.title, job.description, 'close'))
        });
      } else {
        response.forEach(job => {
          $('#jobs').append(createCard(job.title, job.description, 'show'))
        });
      }
    })
    .catch(() => {
      showNotify('error', 'Não foi possível encontrar vagas')
    })
}

function createCard (title, description, type = 'show') {
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
    const button = $('<button>Candidatar-se</button>')

    $(button).addClass('btn btn-secondary text-white')
    cardButtonContainer.append(button)

    $(cardButtonContainer).addClass('d-flex justify-content-end')
    cardBody.append(cardButtonContainer)
  }

  return $('<div></div>').addClass('col-lg-4 col-md-6 col-12').append(card)
}

getJobs()
