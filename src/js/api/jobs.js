import HttpClient from '../../js/api/HttpClient.js'
import { createCard } from '../components/card.js';

const fetchApi = new HttpClient()
      
// const form = document.querySelector('form')
// form.addEventListener('submit', (event) => {
//   event.preventDefault()
//   createJob()
// })

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

function createJob() {
  const newJob = {
    title: 'teste de criação',
    description: 'Um emprego pra alguém que queira trabalhar',
    uf: 'PR',
    salary: 2.5
  }

  fetchApi.post('/jobs', newJob)
    .then((response) => {
      if(!response.ok) {
        console.log(response);
        throw new Error('Oops, Houve algo de errado!')
      }
      return response.json()
    })
    .then((response) => {
      console.log(response);
      // window.location.href = 'http://127.0.0.1:5500/src/html/auth/login.html'
    })
    .catch((error) => {
      console.log(error)
    })
}

getJobs()