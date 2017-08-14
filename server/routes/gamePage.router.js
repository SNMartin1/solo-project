//Requires
var express = require('express');
var router = express.Router();
var Game = require('../models/addgame.schema.js');

router.get('/:gameId', function(req, res) {
  // find (select) all sessions in individual game
  //Game.find finds all the games for the currently logged in user.
  Game.find({_id: req.params.gameId}, function(err, data) {
    if(err) {
      console.log('find error:', err);
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  });
});


router.post('/:gameId', function(req, res) {
  console.log('ID of game to update: ', req.params.gameId);
  console.log('log the data to terminal: ', req.body);
  console.log('log the user to terminal: ', req.user);

  //create a newGameSession object
  var newGameSession = {addPlay: req.body.addPlay, date: req.body.date, win: req.body.win, notes: req.body.notes, userId: req.user._id};
  console.log("newGameSession: ", newGameSession);

  //adding newGameSession from gamepage.controller to the db
    function addNewGameSession(name, addNewGameSession, callback) {
    Game.findOne(name,
      function(err, game) {
        if(err) {
          callback(false);
        } else {
          //sessions refers to the nested schema in gameSchema
          game.sessions.push(newGameSession);
          game.save(function(err){
            if(err) {
              callback(false);
            } else {
              callback(true);
            }
          });
        }
    }); // end addNewGameSession
  }
  addNewGameSession({_id: req.params.gameId}, newGameSession, function(success){
        if (success) {
          res.sendStatus(200);
        } else {
          res.sendStatus(500);
        }
      });
});

module.exports = router;
