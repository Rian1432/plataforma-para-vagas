import 'bootstrap/dist/js/bootstrap.bundle.js'
import { HttpClient } from '../shared/HttpClient.js'
import { cardComponent } from '../shared/card.js';
import { logout, isAuthenticated } from '../shared/global.js'
import $ from 'jquery'
import 'jquery.cookie'

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
          $('#jobs').append(cardComponent(job.title, job.description, 'close'))
        });
      } else {
        response.forEach(job => {
          $('#jobs').append(cardComponent(job.title, job.description, 'show'))
        });
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

getJobs()
