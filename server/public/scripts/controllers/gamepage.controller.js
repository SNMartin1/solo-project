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
          swal(
              'Game Session Deleted!'
              // 'success'
            );
          getSessions();
        });
      };

      //update game session information
        gpc.updateSession = function(session) {
            console.log('update game session: ', session);
            var data = {
                        date: session.date,
                        win: session.win,
                        notes: session.notes
                        };
            $http.put('/gamepage/' + session._id + '/' + gpc.selectedGame._id, data)
              .then(function(response) {
                getSessions();
              });
          }; //end of updateSession

var counter = 0;

  function getSessions() {
    $http.get('/gamepage/' + gpc.selectedGame._id).then(function(response) {
      console.log("response data: ", response.data);
      gpc.selectedGame.sessions = response.data[0].sessions;
      console.log('response.data: ', response.data[0].sessions);
      console.log("gameSessions: ", gpc.gameSessions);
    });
   //logic for math of times played and wins
     gpc.counter = 0;
     gpc.numberPlays = gpc.selectedGame.sessions.length;
     for (var i = 0; i < gpc.selectedGame.sessions.length; i++) {
       if (gpc.selectedGame.sessions[i].win === "yes" || gpc.selectedGame.sessions[i].win ==="true" || gpc.selectedGame.sessions[i].win === "Yes" || gpc.selectedGame.sessions[i].win ==="True") {
            gpc.counter += 1;
            console.log('gpc.counter: ', gpc.counter);
            console.log('gpc.numberPlays: ', gpc.numberPlays);
          }
        }
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
