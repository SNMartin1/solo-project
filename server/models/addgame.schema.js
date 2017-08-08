var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create the Schema
var gameSchema = new Schema({
  name: {type: String, required: true},
  numPlayers: {type: String},
  estGameTime: {type: String},
  userId: {type: String}
});

// export our model
module.exports = mongoose.model('Game', gameSchema);
