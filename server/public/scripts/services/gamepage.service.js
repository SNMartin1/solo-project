myApp.factory('GamepageService', function(){
  console.log('GamepageService Loaded');

  var gameInfo = {currentGame: {}};
  //returning game info, makes it visable to controllers (user, gamepage)
  return {gameInfo: gameInfo};


  });
