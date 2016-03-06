// var $ = require('jquery')

function hideShelterInfo() {
  $('.shelter-info').hide()
}

function addPetToPage(pet) {
  // console.log(pet)
  sessionStorage.setItem("currentPet", JSON.stringify(pet));
  // $('.name').text(pet.name)
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
  // $('.pet-info').text(infoText)
  pet.photo = pet.photo
  // $('.profile-photo').attr('src', pet.photo)
}

function addLikedPet() {
  // Create an empty card
  $('#fixed-tab-2').append(
    '<div class="puppy-card mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col">' +
      '<div class="mdl-card__media">' +
        '<img class= "profile-photo" src="" width="100%" alt="" style="padding:0px;"/>' +
      '</div>' +
      '<div class="mdl-card__title">' +
        '<h2 class="name mdl-card__title-text">' +
        '</h2>' +
      '</div>' +
      '<div class="pet-info mdl-card__supporting-text">' +
      '</div>' +
      '<div class="mdl-card__actions mdl-card--border">' +
        '<a id="" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href="#">Contact shelter</a>' +
      '</div>' +
    '</div>')
  // Get the current pet
  var pet = sessionStorage.getItem('currentPet')
  // Put the pet's info into the card
  $('#fixed-tab-2 .profile-photo').attr('src', pet.photo)
  $('#fixed-tab-2 .name').text(pet.name)
}

function hideSpinner() {
  $('.mdl-spinner').toggleClass('is-active')
  $('.spinner').hide()
}

function showCard() {
  $('.puppy-card').show()
}

module.exports = {
  hideShelterInfo: hideShelterInfo,
  addPetToPage: addPetToPage,
  addLikedPet: addLikedPet,
  hideSpinner: hideSpinner,
  showCard: showCard
}
