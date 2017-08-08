myApp.controller('InfoController', function(UserService, $http) {
  console.log('InfoController created');
  var gc = this;
  gc.userService = UserService;
  gc.newGame = {};
  gc.userGames = [];

  getGames();


//function to add game to user's library
  gc.addGames = function() {
      console.log('add game', gc.newGame);
      $http.post('/info', gc.newGame)
        .then(function(response) {
          console.log('added game:', response);
          getGames();
        });
    };

//gets all the user's games
  function getGames() {
    $http.get('/info').then(function(response) {
      console.log(response.data);
      gc.userGames = response.data;
    });
  }
});
