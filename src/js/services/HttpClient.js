export default class HttpClient {
  baseUrl = 'http://localhost:3000'
  config = {
    method: 'POST',
    body: '',
    headers: {
      'Content-Type': 'application/json',
    }
  }

  constructor() {
  }

  post(route, data) {
    const url = `${this.baseUrl}${route}`
    this.config.body = JSON.stringify(data)

    return fetch(url, this.config)
  }
}