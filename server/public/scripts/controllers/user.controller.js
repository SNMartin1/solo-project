myApp.controller('UserController', function(UserService, $http) {
  console.log('UserController created');
  var uc = this;
  uc.userService = UserService;
  uc.userObject = UserService.userObject;

  uc.newGame = {};
  uc.userGames = [];

  getGames();


//gets all the user's games
  function getGames() {
    $http.get('/info').then(function(response) {
      console.log(response.data);
      uc.userGames = response.data;
    });
  }
});
