(function () {
  angular.module('app')
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', configRoutes])

  function configRoutes($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
          .state('home', {
            url: '/',
            templateUrl: 'app/home/home.html',
            controller: 'MainController as main'
          })
          .state('likes', {
            url: '/likes',
            templateUrl: 'app/likes/likes.html',
            controller: 'MainController as main'
          })
          .state('settings', {
            url: '/settings',
            templateUrl: 'app/settings/settings.html',
            controller: 'MainController as main'
          })

          $urlRouterProvider.otherwise('/')
    }
}())
