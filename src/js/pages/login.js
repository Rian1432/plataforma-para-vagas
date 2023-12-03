import {HttpClient} from '../api/HttpClient'
import $ from 'jquery'

const fetchApi = new HttpClient()

$('form').on('submit', (event) => {
  event.preventDefault()
  login()
})

function login() {
  const userData = {
    email: document.querySelector('#email-login').value,
    password: document.querySelector('#password-login').value,
  }
  
  fetchApi.post('/login', userData)
    .then((response) => {
      if(!response.ok) {
        console.log(response);
        throw new Error('Oops, Houve algo de errado!')
      }
      
      return response.json()
    })
    .then((response) => {
      document.cookie = `Token=${response.accessToken};path=/`
      document.cookie = `User=${JSON.stringify(response.user)};path=/`
      window.location.href = '/index.html'
    })
    .catch((error) => {
      console.log(error)
    })
}
