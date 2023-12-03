export function logout() {
  document.cookie = 'Token='
  document.cookie = 'User='
  window.location.href = 'login.html'
}
