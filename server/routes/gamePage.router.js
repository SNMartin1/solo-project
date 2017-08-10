//Requires
var express = require('express');
var router = express.Router();
var Game = require('../models/addgame.schema.js');

// router.get('/', function(req, res) {
//   // find (select) all documents in our collection
//   //Game.find finds all the games for the currently logged in user.
//   Game.find({userId: req.user._id}, function(err, data) {
//     if(err) {
//       console.log('find error:', err);
//       res.sendStatus(500);
//     } else {
//       res.send(data);
//     }
//   });
// });


router.post('/:gameId', function(req, res) {
  console.log('ID of game to update: ', req.params.gameId);
  console.log('log the data: ', req.body);
  console.log('log the user: ', req.user);

  //create a newGameSession object
  var newGameSession = {addPlay: req.body.addPlay, date: req.body.date, win: req.body.win, notes: req.body.notes, userId: req.user._id};
  //create an object instance from Game model
  // var addGameSession = new GameSession(newGameSession);
  //
  // // insert game session info into game collection
  // addGameSession.save(function(err, data) {
  //   console.log('saved data:', data);
  //   if(err) {
  //     console.log('save error: ', err);
  //     res.sendStatus(500);
  //   } else {
  //     res.sendStatus(201);
  //   }
  // });
});

module.exports = router;
