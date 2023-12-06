import 'bootstrap/dist/js/bootstrap.bundle.js'
import { HttpClient } from '../api/HttpClient.js'
import { createCard } from '../shared/card.js';
import { logout, isAuthenticated } from '../shared/global.js'
import $ from 'jquery'
import 'jquery.cookie'

$(document).ready(isAuthenticated)

const user = JSON.parse($.cookie('User'))
const fetchApi = new HttpClient()
const isRecruiter = user.role === 'recruiter'

$('.user-name').text(`Olá, ${user.name}`)
$('.exit').on('click', logout)

if(user.role === 'recruiter')
  showCreateButton()

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
      response.forEach(job => {
        $('#jobs').append(createCard(job.title, job.description))
      });
    })
    .catch((error) => {
      console.log(error)
    })
}

getJobs()
