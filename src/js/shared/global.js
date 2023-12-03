import $ from 'jquery'
import 'jquery.cookie'

export function logout() {
  $.removeCookie('Token', { path: '/' })
  $.removeCookie('User', { path: '/' })
  window.location.href = 'login.html'
}

export function isAuthenticated () {
  if(!$.cookie('Token')) {
    window.location.href = 'login.html'
  }
}
