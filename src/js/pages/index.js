import 'bootstrap/dist/js/bootstrap.bundle.js'
import { HttpClient } from '../api/HttpClient.js'
import { createCard } from '../shared/card.js';
import { logout, isAuthenticated } from '../shared/global.js'
import $ from 'jquery'

$(document).ready(isAuthenticated)
$('.exit').on('click', logout)

const fetchApi = new HttpClient()

function getJobs() {
  fetchApi.get('/jobs?_limit=9')
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