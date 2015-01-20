angular.module('HearMeRoar.songs', ['HearMeRoar.api.services'])

.controller('SongsController', ['$scope', 'Song', function($scope, Song) {
  $scope.songs;
  
  $scope.getSongs = function() {
    Song.getAll().then(function(songs) {
      $scope.songs = songs.data;
    });
  };

  $scope.getSongs();
}]);
