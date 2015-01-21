angular.module('HearMeRoar.admin.songs', ['HearMeRoar.api.services'])

.controller('AdminSongsController', ['$scope', 'Song', function($scope, Song) {
  $scope.songs;
  $scope.newSong = {};
  
  $scope.getSongs = function() {
    Song.getAll().then(function(songs) {
      $scope.songs = songs.data;
    });
  };

  $scope.showSong = function(song) {
    Song.pushToCache(song);
    window.location.href = '/#/song-info';
  }

  $scope.addSong = function(song) {
    if(song.hasOwnProperty('artist') &&
       song.hasOwnProperty('title') &&
       song.hasOwnProperty('album') &&
       song.hasOwnProperty('genre')) {
      
      Song.post(song).then(function(){
        $scope.getSongs();
        $scope.newSong = {};
      })
    }
  };

  $scope.deleteSong = function(song) {
    Song.delete(song._id).then(function(){
      $scope.getSongs();
    });
  };

  $scope.getSongs();
}]);
