import HttpClient from '../api/HttpClient.js'
import { createCard } from '../shared/card.js';
import { logout } from '../shared/global.js'
import $ from 'jquery'

const fetchApi = new HttpClient()
const exitButton = $('#exit')[0]

function getJobs() {
  fetchApi.get('/jobs?_limit=9')
    .then((response) => {
      if(!response.ok) {
        console.log(response);
        throw new Error('Oops, Houve algo de errado!')
      }
      return response.json()
    })
    .then((response) => {
      response.forEach(job => {
        const jobsContainer = document.querySelector('#jobs')
        jobsContainer.appendChild(createCard(job.title, job.description))
      });
    })
    .catch((error) => {
      console.log(error)
    })
}

getJobs()

exitButton.addEventListener('click', () => {
  logout()
})