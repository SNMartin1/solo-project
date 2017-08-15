myApp.controller('GamepageController', function(UserService, GamepageService, $http) {
  console.log('GamepageController created');
  var gpc = this;
    //need vars for math of times played and wins
  console.log("gamepage service: ", GamepageService.gameInfo.currentGame);

  //Pulls and displays basic game information from home page
  gpc.selectedGame = GamepageService.gameInfo.currentGame;

  gpc.gameSessions = [];
  console.log("gameSessions: ", gpc.gameSessions);

  getSessions();


  // delete a specific game session that is clicked on
    gpc.deleteSession = function(id) {
      console.log('delete session with id: ', id);
      $http.delete('/gamepage/' + id + '/' + gpc.selectedGame._id)
        .then(function(response) {
          getSessions();
        });
      };


  function getSessions() {
    $http.get('/gamepage/' + gpc.selectedGame._id).then(function(response) {
      console.log("response data: ", response.data);
      gpc.selectedGame.sessions = response.data[0].sessions;
      console.log("gameSessions: ", gpc.gameSessions);
    });
   //logic for math of times played and wins

  }


  //function to add game session info to individual game page
  //newGameSession is a var from gamePage.router
    gpc.addGameSession = function() {
        console.log('add game session:', gpc.newGameSession);
        $http.post('/gamepage/' + gpc.selectedGame._id, gpc.newGameSession)
          .then(function(response) {
            console.log('added game session:', response);
            //gpc.newGameSession = {};
          });
      };

  });
