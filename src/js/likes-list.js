// var $ = require('jquery')
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
        // Clear the likes list
        $('#fixed-tab-2').empty()

        // For every pet in the list, create a card and add them to the page
        var length = connectionsData.length
        for (var i=0; i<length; i++) {
          var pet = connectionsData[i]
          console.log('pet', pet);
          var shelterPhoneNumber = pet.contact.phone[0]
          var cleanedShelterPhoneNumber = removeNonNumerals(shelterPhoneNumber)

          // Create a blank card and put it on the page
          var blankCard =
            '<div id="puppy-card-' + i + '" class="puppy-card mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col">' +
              '<div class="mdl-card__media">' +
                '<img class="profile-photo-' + i +
                 '" src="" width="100%" alt="" style="padding:0px;"/>' +
              '</div>' +
              '<div class="mdl-card__title">' +
                '<h2 class="name-' + i + ' mdl-card__title-text"></h2>' +
              '</div>' +
              '<div class="pet-info-' + i + ' mdl-card__supporting-text"></div>' +
              '<div class="mdl-card__actions mdl-card--border">' +
                '<a class="contact-shelter mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href=tel:"' +
                cleanedShelterPhoneNumber + '"' +
                '>Call the shelter' +
                '</a>' +
                '<a data-id="' + pet.petfinder_id + '" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect dislikeButton" href="#">Unlike</a>' +
                '<div class="mdl-card__supporting-text">' +
                'Shelter phone: ' +
                 shelterPhoneNumber +
                 '</div>' +
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

function removeNonNumerals(string) {
  var result = ''
  var stringArray = string.split('')
  stringArray.forEach(function(char) {
    if (char >= '0' && char <= '9') {
      result += char
    }
  })
  return result
}

module.exports = {
  handleDisplayLikes: handleDisplayLikes
}
