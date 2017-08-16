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

router.delete('/:id/:gameId', function(req, res) {
  console.log('delete with id: ', req.params.id);

  Game.findByIdAndUpdate(
    {_id: req.params.gameId },
    {
      '$pull': {
        'sessions':{ '_id': req.params.id }
      }
    },
      function(err, data) {
          if(err) {
            console.log('remove error: ', err);
            res.sendStatus(500);
          } else {
            console.log('things went fine?', data);
            res.sendStatus(200);
          }
        }
  );
  //
  // Game.save(function(err) {
  //   console.log('here?', err);
  //   if(err) {
  //     res.sendStatus(500);
  //   } else {
  //     res.send(200);
  //   }
  // });

  // Game.findByIdAndRemove(
  //   { _id: parent.children.id(req.params.id) },
  //   function(err, data) {
  //     if(err) {
  //       console.log('remove error: ', err);
  //       res.sendStatus(500);
  //     } else {
  //       console.log('things went fine?', data);
  //       res.sendStatus(200);
  //     }
  //   }
  // );

});

//PUT route to update game session information
router.put('/:id/:gameId', function(req, res) {
  console.log('update game session: ', req.body);

  Game.findById(req.params.gameId,
    function(err, game) {
      if(err) {
        res.sendStatus(500);
      } else {
        var session = game.sessions.id(req.params.id);
        console.log('log out session: ', session);
        session.date = req.body.date;
        session.win = req.body.win;
        session.notes = req.body.notes;
        game.save(function(err){
          if(err) {
          res.sendStatus(500);
          } else {
            res.sendStatus(200);
          }
        });
      }
  }); // end addNewGameSession
  // Old way
  // Game.findByIdAndUpdate(
  //   { _id: req.params.id },
  //   { $set: {
  //     date: req.body.date,
  //     win: req.body.win,
  //     notes: req.body.notes
  //     }
  //   }, // data to replace
  //   function(err, data) {
  //     if(err) {
  //       console.log('update error: ', err);
  //       res.sendStatus(500);
  //     } else {
  //       res.sendStatus(200);
  //     }
  //   }
  // );
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
  //calling addNewGameSession function
  addNewGameSession({_id: req.params.gameId}, newGameSession, function(success){
        if (success) {
          res.sendStatus(200);
        } else {
          res.sendStatus(500);
        }
      });
}); //end Post to add new game session

module.exports = router;
