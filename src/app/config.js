(function () {
  angular.module('app')
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', configRoutes])

  function configRoutes($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
          .state('home', {
            url: '/',
            templateUrl: 'app/home/home.html'
          })
          .state('likes', {
            url: '/likes',
            templateUrl: 'app/likes/likes.html'
          })
          .state('settings', {
            url: '/settings',
            templateUrl: 'app/settings/settings.html'
          })

          $urlRouterProvider.otherwise('/')
    }
}())
