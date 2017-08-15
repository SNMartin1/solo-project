myApp.controller('GamesessionController', function(UserService, GamepageService, $http, $location) {
  console.log('GamesessionController created');
  var gpc = this;
    //need vars for math of times played and wins
  console.log("gamepage service: ", GamepageService.gameInfo.currentGame);

  gpc.selectedGame = GamepageService.gameInfo.currentGame;


//function to add game session info to individual game page
//newGameSession is a var from gamePage.router
  gpc.addGameSession = function() {
      console.log('add game session:', gpc.newGameSession);
      $http.post('/gamepage/' + gpc.selectedGame._id, gpc.newGameSession)
        .then(function(response) {
          console.log('added game session:', response);
          //gpc.newGameSession = {};
          $location.path('/gamepage');
        });
    };

});
