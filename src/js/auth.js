var $ = require('jquery')

function getUser() {
  if(localStorage.token) {
    return JSON.parse(atob(localStorage.token.split('.')[1])).user;
  }
}

function handleLogin() {
  $('.login').click(function(event) {
    var userCredentials = {
      email:    $('#login_email').val(),
      password: $('#login_password').val()
    }
    $.ajax(
      {
        url: 'https://dander.herokuapp.com/auth/login',
        method: 'post',
        data: userCredentials
      }
    ).done(function(response) {
      console.log('Success. Here\'s the response: ' + response.token)
      localStorage.setItem('token', response.token)
      console.log('Here is the user: ' + getUser().first_name)
      message('You are logged in!')
      window.location = '/'
    }).fail(function(msg) {
      console.error(msg)
      console.log('Failed to log in')
    })
  })
}

function handleLogout() {
  $('.logout').click(function() {
    logOut()
  })
}

function handleSignup() {
  $('.sign-up').click(function() {
    var userInfo = {
      first_name: $('#first-name').val(),
      last_name:  $('#last-name').val(),
      email:      $('#email').val(),
      password:   $('#password').val(),
      zipcode:    $('#zipcode').val()
    }

    $.ajax({
      method: 'post',
      url: 'https://dander.herokuapp.com/auth/signup',
      data: userInfo
    })
      .done(function(results) {
        console.log('Sign up successful:', results)
        message('Successfully signed up! Log in below.')
      })
      .fail(function() {
        console.log('Sign up failed.')
        message('Hm, something went wrong. Please try again.')
      })
  })
}

function message(message) {
  $('#welcome-message').text(message)
}

function showUserName() {
  if (getUser()) {
    console.log(getUser().first_name)
    $('.user-name').text(getUser().first_name)
  }
}


function logOut() {
  console.log('Logged out')
  localStorage.token = ''
  message('You are logged out.')
  window.location = '/'
}

$(function() {
  if(localStorage.token) {
    $.ajaxSetup({
      headers: {
        Authorization: 'Bearer ' + localStorage.token
      }
    });
  }
  handleLogin()
  handleLogout()
  handleSignup()
  // Every time the page loads, update the display of user name on the page.
  showUserName()
  // Clear the message section
  message('')
})
