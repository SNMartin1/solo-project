myApp.controller('InfoController', function(UserService, $http) {
  console.log('InfoController created');
  var gc = this;
  gc.userService = UserService;

  //function to add game to user's library
    gc.addGames = function() {
        console.log('add game', gc.newGame);
        $http.post('/info', gc.newGame)
          .then(function(response) {
            console.log('added game:', response);
            alert("Game added!");
            gc.newGame = {};
          });
      };

});
