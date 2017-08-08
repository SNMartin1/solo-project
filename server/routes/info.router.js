//Requires
var express = require('express');
var router = express.Router();
var Game = require('../models/addgame.schema.js');

router.get('/', function(req, res) {
  // find (select) all documents in our collection
  //Game.find finds all the games for the currently logged in user.
  Game.find({userId: req.user._id}, function(err, data) {
    if(err) {
      console.log('find error:', err);
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  });
});


router.post('/', function(req, res) {
  console.log('log the data: ', req.body);
  console.log('log the user: ', req.user);

  var newGame = {name: req.body.name, numPlayers: req.body.numPlayers, estGameTime: req.body.estGameTime, userId: req.user._id};
  //create an object instance from Game model
  var addGame = new Game(newGame);

  // insert into game collection
  addGame.save(function(err, data) {
    console.log('saved data:', data);
    if(err) {
      console.log('save error: ', err);
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
    }
  });
});

module.exports = router;
