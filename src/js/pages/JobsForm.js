import 'bootstrap/dist/js/bootstrap.bundle.js'
import {HttpClient} from '../../js/api/HttpClient.js'
import { logout, isAuthenticated } from '../shared/global.js'
import $ from 'jquery'

$(document).ready(isAuthenticated)
$('.exit').on('click', logout)

const fetchApi = new HttpClient()

export function createJob(data) {
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
