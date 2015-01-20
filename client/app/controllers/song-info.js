angular.module('HearMeRoar.songInfo', ['HearMeRoar.api.services'])

.controller('SongInfoController', ['$scope', 'Song', 'Queue', function($scope, Song, Queue) { 
  $scope.song;

  $scope.getSongInfo = function() {
    var song = Song.getFromCache();
    if (song) {
      $scope.song = song;
    } else {
      window.location.href = '/#/songs';
    }
  };

  $scope.enqueue = function(clientName, song) {
    console.log('Here?')
    Queue.enqueue({
      clientName: clientName,
      artist: song.artist,
      title: song.title,
      album: song.album,
      genre: song.genre,
    }).then(function(song) {
      // Move to the 'you have been queued page'
      window.location.href = '/#/in-queue';

    });
  };

  $scope.getSongInfo();

}]);