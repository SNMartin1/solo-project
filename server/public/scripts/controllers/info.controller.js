myApp.controller('InfoController', function(UserService, $http) {
  console.log('InfoController created');
  var gc = this;
  gc.userService = UserService;

  //function to add game to user's library
  //newGame var from info.router.
    gc.addGames = function() {
        console.log('add game', gc.newGame);
        $http.post('/info', gc.newGame)
          .then(function(response) {
            console.log('added game:', response);
            //sweetalert2 code
            swal(
                'Game Added!',
                'success'
              );
            gc.newGame = {};
          });
      };

//Filestack API - Used to add a photo when a game is added.
      gc.client = filestack.init('AF1yAqcFiSfm7kzeLq5Rqz');
      gc.showPicker = function() {
         gc.client.pick({
         }).then(function(result) {
           gc.newGame.img = result.filesUploaded[0].url;
             console.log(JSON.stringify(result.filesUploaded));
         });
     };

});
