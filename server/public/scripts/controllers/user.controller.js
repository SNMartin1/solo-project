myApp.controller('UserController', function(UserService, GamepageService, $http, $location) {
  console.log('UserController created');
  var uc = this;
  uc.userService = UserService;
  uc.userObject = UserService.userObject;

  //uc.newGame = {};
  uc.userGames = [];
  //console.log(uc.newGame);

  getGames();

  uc.selectGame = function(game) {
    console.log("picked game: ", game);
    GamepageService.gameInfo.currentGame = game;
    $location.path("/gamepage");
  };


//gets all the user's games
  function getGames() {
    $http.get('/info').then(function(response) {
      console.log(response.data);
      uc.userGames = response.data;
    });
  }

// delete a specific game that is clicked on
  uc.deleteGame = function(id) {
    console.log('delete game with id: ', id);
    $http.delete('/user/' + id)
      .then(function(response) {
        getGames();
      });
    };

//update game information
  uc.updateGame = function(game) {
      console.log('update game: ', game);
      var data = {
                  name: 'go',
                  numPlayers: '1',
                  estGameTime: '40 min'
                  };
      $http.put('/user/' + game._id, data)
        .then(function(response) {
          getGames();
        });
    }; //end of updateGame
  }); //end of controller
