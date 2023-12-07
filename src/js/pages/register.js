import {HttpClient} from '../shared/HttpClient.js'
import { showNotify } from '../shared/global.js'
import $ from 'jquery'

const fetchApi = new HttpClient()    

$('form').on('submit', (event) => {
  event.preventDefault()
  createUser()
})

function createUser() {
  const newUser = {
    email: $('#email-register').val(),
    password: $('#password-register').val(),
    name: $('#name-register').val(),
    role: $('input[name=role-register]:checked').val()
  }

  fetchApi.post('/register', newUser)
    .then((response) => {
      if(!response.ok) {
        throw new Error('Oops, Houve algo de errado!')
      }
      return response.json()
    })
    .then((response) => {
      showNotify('success', 'Usuário registrado com sucesso!')
      console.log(response);
    })
    .catch((error) => {
      showNotify('error', 'Não foi possível criar o usuário.')
      console.log(error)
    })
}