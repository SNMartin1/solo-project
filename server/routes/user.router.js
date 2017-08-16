//Requires
var express = require('express');
var router = express.Router();
var Game = require('../models/addgame.schema.js');


//Handles delete route to delete a game
router.delete('/:id', function(req, res) {
  console.log('in delete route');
  console.log('delete game with id: ', req.params.id);

  Game.findByIdAndRemove(
    { _id: req.params.id },
    function(err, data) {
      if(err) {
        console.log('remove error: ', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    }
  );

}); //end of router.delete

//PUT route to update game information
router.put('/:id', function(req, res) {
  console.log('update game information: ', req.body);

  Game.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: {
      name: req.body.name,
      numPlayers: req.body.numPlayers,
      estGameTime: req.body.estGameTime
      }
    }, // data to replace
    function(err, data) {
      if(err) {
        console.log('update error: ', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    }
  );

}); //end of router.put to update game information

// Handles Ajax request for user information if user is authenticated
router.get('/', function(req, res) {
  console.log('get /user route');
  // check if logged in
  if(req.isAuthenticated()) {
    // send back user object from database
    console.log('logged in', req.user);
    var userInfo = {
      username : req.user.username
    };
    res.send(userInfo);
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    res.send(false);
  }
}); //end of router.get for authentication

// clear all server session information about this user
router.get('/logout', function(req, res) {
  // Use passport's built-in method to log out the user
  console.log('Logged out');
  req.logOut();
  res.sendStatus(200);
}); //end of router.get for logout

module.exports = router;
