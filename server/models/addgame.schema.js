var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gameStatsSchema = new Schema({
  addPlay: {type: String, required: true},
  date : {type: String},
  win: {type: String},
  notes: {type: String}
});

// create the Schema
var gameSchema = new Schema({
  name: {type: String, required: true},
  numPlayers: {type: String},
  estGameTime: {type: String},
  userId: {type: String},
  //refer to other schema here - need an array to store game session info.
  sessions: [gameStatsSchema]
});

// export our model
module.exports = mongoose.model('Game', gameSchema);
