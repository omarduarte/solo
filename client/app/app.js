var app = angular.module('HearMeRoar', [
  'HearMeRoar.songs',
  'HearMeRoar.queue',
  'HearMeRoar.songInfo',
  'HearMeRoar.inQueue' ,
  'HearMeRoar.admin.songs',
  'HearMeRoar.admin.queue',
  'ngRoute'])

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
    .when('/admin', {
      templateUrl: '../views/admin-queue.html',
      controller: 'AdminQueueController'
    })
    .when('/admin/queue', {
      templateUrl: '../views/admin-queue.html',
      controller: 'AdminQueueController'
    })
    .when('/admin/songs', {
      templateUrl: '../views/admin-songs.html',
      controller: 'AdminSongsController'
    })
    .otherwise({
      redirectTo: '/songs'
    });
});