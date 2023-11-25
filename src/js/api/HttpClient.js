export default class HttpClient {
  baseUrl = 'http://localhost:3000'
  config = {
    method: 'POST',
    body: null,
    headers: {
      'Content-Type': 'application/json',
    }
  }

  constructor() {
  } 

  get(route) {
    const url = `${this.baseUrl}${route}`
    this.config.method = 'GET'

    return fetch(url, this.config)
  }

  post(route, data) {
    const url = `${this.baseUrl}${route}`
    this.config.body = JSON.stringify(data)

    return fetch(url, this.config)
  }

  put(route, data) {
    const url = `${this.baseUrl}${route}`
    this.config.method = 'PUT'
    this.config.body = JSON.stringify(data)

    return fetch(url, this.config)
  }

  delete(route) {
    const url = `${this.baseUrl}${route}`
    this.config.method = 'DELETE'

    return fetch(url, this.config)
  }
}