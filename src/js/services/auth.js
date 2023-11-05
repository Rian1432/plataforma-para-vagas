import HttpClient from './HttpClient.js'

const fetchApi = new HttpClient()
const form = document.querySelector('form')

form.addEventListener('submit', (event) => {
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
      document.cookie = `Token=${response.accessToken}`
      document.cookie = `User=${JSON.stringify(response.user)}`
      window.location.href = 'http://127.0.0.1:5500/src/html/index.html'
    })
    .catch((error) => {
      console.log(error)
    })
}