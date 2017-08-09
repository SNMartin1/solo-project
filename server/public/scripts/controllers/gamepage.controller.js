myApp.controller('GamepageController', function(UserService, GamepageService, $http) {
  console.log('GamepageController created');
  var gpc = this;


  console.log("gamepage service: ", GamepageService.gameInfo.currentGame);

  gpc.selectedGame = GamepageService.gameInfo.currentGame;

  });
