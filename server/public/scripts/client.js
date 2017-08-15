var myApp = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'xeditable']);

/// Routes ///
myApp.config(function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  console.log('myApp -- config');
  $routeProvider
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: 'LoginController as lc',
    })
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: 'LoginController as lc'
    })
    .when('/gamesession', {
      templateUrl: '/views/templates/addsession.html',
      controller: 'GamesessionController as gsc'
    })
    .when('/about', {
      templateUrl: 'views/templates/about.html',
    })
    .when('/user', {
      templateUrl: '/views/templates/user.html',
      controller: 'UserController as uc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/info', {
      templateUrl: '/views/templates/info.html',
      controller: 'InfoController as ic',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/gamepage', {
      templateUrl: '/views/templates/gamepage.html',
      controller: "GamepageController as gpc"
    })
    .otherwise({
      redirectTo: 'home'
    });
});

myApp.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});
