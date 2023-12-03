import HttpClient from '../../js/api/HttpClient.js'
import { logout } from '../shared/global.js'

const fetchApi = new HttpClient()
const exitButton = document.querySelector('#exit')

export function createJob(data) {
  fetchApi.post('/jobs', data)
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

exitButton.addEventListener('click', () => {
  logout()
})
