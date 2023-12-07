import * as bootstrap from 'bootstrap'
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

export function showNotify (status = 'success', message) {
  const toast = $('#toast')[0]
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toast)
  
  status === 'success' 
    ? $(toast).addClass('bg-success')
    : $(toast).addClass('bg-danger') 
  
  $('.toast-body').text(message)
  toastBootstrap.show()
}
