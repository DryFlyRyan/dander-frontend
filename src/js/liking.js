var $ = require('jquery')
var display = require('./display')
var petIndex = require('./counter')

function getUser() {
  if(localStorage.token) {
    return JSON.parse(atob(localStorage.token.split('.')[1])).user;
  }
}

function handleLike(pets) {
  $('#like').click(function() {
    likeFeedback('Liked!')
    saveLike()
    handleNext(pets)
  })
}

function handleDisLike(pets) {
  $('#dislike').click(function() {
    likeFeedback('Not so much!')
    saveDisLike()
    // displayNextPet(pets)
    handleNext(pets)
  })
}

function handleNext(pets) {
  display.addPetToPage(pets[petIndex()])
}
function displayNextPet(pets) {
  display.addPetToPage(pets[petIndex()])
}

function likeFeedback(feedbackText) {
  $('.click-feedback').show().text(feedbackText).fadeOut(1000, function() {
    $('.click-feedback').empty().hide()
  })
}

function saveLike() {
  var currentPet = JSON.parse(sessionStorage.getItem('currentPet'))
  var user = getUser();
  var likeData = {
    user_id: user.id,
    petfinder_id: currentPet.petfinder_id,
    liked: true
  }
  console.log('Submitting this data to server to save the Like: ' + JSON.stringify(likeData))
  $.ajax({
    method: "POST",
    url: "https://dander.herokuapp.com/connections/new",
    data: likeData
  })
    .done(function() {
      console.log('Like saved.')
    })
    .fail(function() {
      console.log('Failed to save.')
    })
}

function saveDisLike() {
  var currentPet = JSON.parse(sessionStorage.getItem('currentPet'))
  var token = localStorage.getItem('token')
  var user = getUser();
  var likeData = {
    user_id: user.id,
    petfinder_id: currentPet.petfinder_id,
    liked: false
  }
  console.log('Submitting this data to server to save the dislike: ' + JSON.stringify(likeData))
  $.ajax({
    method: "POST",
    url: "https://dander.herokuapp.com/connections/new",
    data: likeData
  })
    .done(function(msg) {
      console.log('Dislike saved: ' + msg)
    })
    .fail(function(msg) {
      console.log('Failed to save: ' + msg)
    })
}

function updateDislike(){
  $('body').on('click', '.dislikeButton', function(){
    console.log('updateDislike')
    var token = localStorage.getItem('token')
    var user = getUser();
    var likeData = {
      user_id: user.id,
      petfinder_id: $(this).data("id"),
      liked: false
    }
    console.log('Submitting this data to server to save the dislike: ' + JSON.stringify(likeData))
    $.ajax({
      method: "POST",
      url: "https://dander.herokuapp.com/connections/unfriend",
      data: likeData
    })
      .done(function(msg) {
        console.log('Dislike saved: ' + msg)
      })
      .fail(function(msg) {
        console.log('Failed to save: ' + msg)
      })
  })
}

module.exports = {
  handleLike: handleLike,
  handleDisLike: handleDisLike,
  handleNext: handleNext,
  updateDislike: updateDislike,
}
