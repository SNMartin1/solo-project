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

  uc.deleteGame = function(id) {
    console.log('delete game with id: ', id);
    $http.delete('/user/' + id)
      .then(function(response) {
        getGames();
      });
    };
  });
