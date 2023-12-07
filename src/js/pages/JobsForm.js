import 'bootstrap/dist/js/bootstrap.bundle.js'
import {HttpClient} from '../shared/HttpClient.js'
import { logout, isAuthenticated } from '../shared/global.js'
import $ from 'jquery'

$(document).ready(isAuthenticated)

const user = JSON.parse($.cookie('User'))
const fetchApi = new HttpClient()

$('.user-name').text(`Olá, ${user.name}`)
$('.exit').on('click', logout)
$('#send-button').on('click', createJob)

export function createJob() {
  const data = {
    title: $('#title').val(),
    description: $('#description').val(),
    salary: $('#salary').val(),
    recruiterId: user.id,
    uf: 'pr'
  }

  fetchApi.post('/jobs', data)
    .then((response) => {
      if(!response.ok) {
        throw new Error('Oops, Houve algo de errado!')
      }
      return response.json()
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error)
    })
}
