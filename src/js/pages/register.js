import {HttpClient} from '../../js/api/HttpClient.js'
import $ from 'jquery'

const fetchApi = new HttpClient()    

$('form').on('submit', (event) => {
  event.preventDefault()
  createUser()
})

function createUser() {
  const newUser = {
    email: document.querySelector('#email-register').value,
    password: document.querySelector('#password-register').value,
    name: document.querySelector('#name-register').value,
    role: document.querySelector('input[name=role-register]:checked').value
  }

  fetchApi.post('/register', newUser)
    .then((response) => {
      if(!response.ok) {
        console.log(response);
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