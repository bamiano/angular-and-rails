var rafflerApp = angular.module("Raffler", ["rails"]);

rafflerApp.factory("Player", function(railsResourceFactory){
  var resource = railsResourceFactory({
    url: '/players',
    name: 'player'});
  return resource;
});

rafflerApp.controller("RaffleController",[ "$scope", "Player", function($scope, Player){

  Player.query().then(function(results){
    $scope.players = results;
  });

  // scope drawWinner function {
    // same player cannot win again
    // pick a winner
    // style / mark a winner in UI
    // set player.winner = true and update server using Player factory
  // }

  $scope.addPlayer = function(){
    console.log($scope.newName);
    var newPlayer = new Player({
      name: $scope.newName,
      rating: 5,
      winner: false
    });
    newPlayer.create().then(function(newPlayerInRailsJustCreated){
      $scope.players.push(newPlayerInRailsJustCreated);
      console.log(newPlayerInRailsJustCreated);
    });
  };

  $scope.drawWinner = function(){
    var winnersArray = [];
    var randomPlayer;
    var setWinner = function(){
      randomPlayer = $scope.players[Math.floor(Math.random() * $scope.players.length)];
      if (randomPlayer.winner === true) {
        setWinner();
      }
    };

    var everyoneHasWon = $scope.players.every(function (player) {
      return player.winner;
    });

    if (everyoneHasWon) {
      alert("Everyone's a Winner!!!!!!!!!!");
    }
    else {
      setWinner();
      randomPlayer.winner = true;
      winnersArray.push(randomPlayer);
      console.log(randomPlayer);
      randomPlayer.update();
    }
  };

  $scope.test = 123;

}]);




