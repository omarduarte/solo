var app = angular.module('HearMeRoar', ['HearMeRoar.songs','HearMeRoar.queue','HearMeRoar.songInfo','HearMeRoar.inQueue' ,'ngRoute'])
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
    .when('/song-info', {
      templateUrl: '../views/song-info.html',
      controller: 'SongInfoController'
    })
    .when('/in-queue', {
      templateUrl: '../views/in-queue.html',
      controller: 'InQueueController'
    })
    .otherwise({
      redirectTo: '/songs'
    });
});