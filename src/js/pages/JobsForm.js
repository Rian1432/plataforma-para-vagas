import 'bootstrap/dist/js/bootstrap.bundle.js'
import {HttpClient} from '../shared/HttpClient.js'
import { logout, isAuthenticated, showNotify } from '../shared/global.js'
import $ from 'jquery'
import 'jquery-mask-plugin'

$(document).ready(isAuthenticated)
$('#salary').mask('000.000.000.000.000,00', {reverse: true});

const user = JSON.parse($.cookie('User'))
const fetchApi = new HttpClient()

$('.user-name').text(`Olá, ${user.name}`)
$('.exit').on('click', logout)
$('form').on('submit', (event) => {
  event.preventDefault()
  createJob()
})

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
    .then(() => {
      $('#title').val('')
      $('#description').val('')
      $('#salary').val('')
      showNotify('success', 'Nova vaga criada com sucesso!')
    })
    .catch(() => {
      showNotify('error', 'Não foi possível criar a vaga')
    })
}
