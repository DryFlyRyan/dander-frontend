angular.module('app')
.controller('MainController', ['$http', '$scope', MainController])

function MainController($http, $scope) {
  var zip = '/?zipcode=' + 90210
  var puppyURL = 'https://dander.herokuapp.com/dogs' + zip
  var currentDogIndex = 0

  $http({
    method: 'GET',
    url: puppyURL
  })
  .then(function(result) {
    var dogs = result.data
    console.log(dogs[currentDogIndex]);

    $scope.currentDog = dogs[currentDogIndex]

    $scope.like = function(dog, isLiked) {
      currentDogIndex++
      $scope.currentDog = dogs[currentDogIndex]
      var user = getUser()
      console.log('liking this dog: ', dog, isLiked);
      var likeData = {
        user_id: user.id,
        petfinder_id: dog.petfinder_id,
        liked: isLiked
      }
      $http({
        method: "POST",
        // Getting CORS on this request
        url: "https://dander.herokuapp.com/connections/new",
        data: likeData
      })
      .then(function() {
        console.log('Like saved: ', likeData)
      })
      .catch(function() {
        console.log('Failed to save like.');
      })
    }
  })
}

// To do: Put this in a service.
function getUser() {
  if(localStorage.token) {
    return JSON.parse(atob(localStorage.token.split('.')[1])).user;
  }
}
