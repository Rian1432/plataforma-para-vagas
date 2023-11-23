import HttpClient from './HttpClient.js'

const fetchApi = new HttpClient()

const formLogin = document.querySelector('#login-form')
const formRegister = document.querySelector('#register-form')

formLogin.addEventListener('submit', (event) => {
  event.preventDefault()
  login()
})

formRegister.addEventListener('submit', (event) => {
  event.preventDefault()
  register()
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
      window.location.href = 'http://127.0.0.1:5500/src/html/index.html'
    })
    .catch((error) => {
      console.log(error)
    })
}

function logout() {
  document.cookie = 'Token='
  document.cookie = 'User='
  window.location.href = 'http://127.0.0.1:5500/src/html/auth/login.html'
}

function register() {
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