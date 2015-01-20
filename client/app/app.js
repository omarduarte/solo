var app = angular.module('HearMeRoar', ['HearMeRoar.songs','HearMeRoar.queue','ngRoute'])
.config(function($routeProvider) {
  $routeProvider
    .when('/songs', {
      templateUrl: '../views/songs.html',
      controller: 'SongsController'
    })
    .when('/queue', {
      templateUrl: '../views/queue.html',
      controller: 'QueueController'
    })
    // .when('/song-info', {
    //   templateUrl: '../views/song-info.html',
    //   controller: 'SongInfoController'
    // })
    .otherwise({
      redirectTo: '/songs'
    });
});