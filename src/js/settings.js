// var $ = require('jquery')

function getUser() {
  if(localStorage.token) {
    return JSON.parse(atob(localStorage.token.split('.')[1])).user;
  }
}

$(function() {
  if (getUser()) {
    console.log('You\'re logged in.')
    $('#for-not-logged-in').hide()
    $('#for-logged-in').show()
  } else {
    console.log('Not logged in.')
    $('#for-not-logged-in').show()
    $('#for-logged-in').hide()
  }
})
