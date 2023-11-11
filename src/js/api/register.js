import HttpClient from '../../js/api/HttpClient.js'

const fetchApi = new HttpClient()
      
const form = document.querySelector('form')
form.addEventListener('submit', (event) => {
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
      // window.location.href = 'http://127.0.0.1:5500/src/html/auth/login.html'
    })
    .catch((error) => {
      console.log(error)
    })
}