var $ = require('jquery')
var display = require('./display')
var petIndex = require('./counter')

function getUser() {
  if(localStorage.token) {
    return JSON.parse(atob(localStorage.token.split('.')[1])).user;
  }
}

function handleDisplayLikes() {
  var user = getUser()
  $('.likes-list-header').click(function() {
    $.ajax({
      url: 'https://dander.herokuapp.com/connections/?id=' + user.id,
      method: 'get'
    })
      .then(function(connectionsData) {
        console.log(connectionsData)
        // Clear the likes list
        $('#fixed-tab-2').empty()
        // For every pet in the list, create a card and add them to the page
        var length = connectionsData.length
        for (var i=0; i<length; i++) {
          var pet = connectionsData[i]
          // Create a blank card and put it on the page
          var blankCard =
            '<div class="puppy-card mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col">' +
              '<div class="mdl-card__media">' +
                '<img class= "profile-photo-' + i + '" src="" width="100%" alt="" style="padding:0px;"/>' +
              '</div>' +
              '<div class="mdl-card__title">' +
                '<h2 class="name-' + i + ' mdl-card__title-text"></h2>' +
              '</div>' +
              '<div class="pet-info-' + i + ' mdl-card__supporting-text"></div>' +
              '<div class="mdl-card__actions mdl-card--border">' +
                '<a id="" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href="#">Contact shelter</a>' +
                '<a data-id="'+pet.petfinder_id+'" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect dislikeButton" href="#">Unfriend</a>' +

              '</div>' +
            '</div>'
          $('#fixed-tab-2').append(blankCard)

          // Fill out the card with the pet's info
          $('.name-'+i).text(pet.name)
          if (pet.sex === 'M')
            pet.sex = 'Male'
          if (pet.sex === 'F')
            pet.sex = 'Female'
          if (pet.size === 'S')
            pet.size = 'Small'
          if (pet.size === 'M')
            pet.size = 'Medium'
          if (pet.size === 'L')
            pet.size = 'Large'
          var infoText = pet.sex + ' | ' + pet.age + ' | ' + pet.size
          $('.pet-info-'+i).text(infoText)
          pet.photo = pet.photo
          $('.profile-photo-'+i).attr('src', pet.photo)
        }
      })
      .fail(function() {
        console.log('Failed to get connections.')
      })
  })
}

module.exports = {
  handleDisplayLikes: handleDisplayLikes
}
