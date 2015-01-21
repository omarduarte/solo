angular.module('HearMeRoar.admin.queue', ['HearMeRoar.api.services'])

.controller('AdminQueueController', ['$scope', 'Queue', function($scope, Queue) {
  $scope.queue = [];
  $scope.nowPlaying;

  $scope.getQueue = function() {
    Queue.getAll().then(function(queue) {
      $scope.queue = queue.data;
      $scope.nowPlaying = $scope.queue.shift();
    });
  };

  $scope.playNextSong = function() {
    Queue.nextSong().then(function(queue) {
      console.log(queue);
      $scope.queue = queue.data;
      $scope.nowPlaying = $scope.queue.shift();
    });
  };

  $scope.removeFromSlot = function(queueItem) {
  	console.log(queueItem);
  	Queue.delete(queueItem._id).then(function(){
  	  $scope.getQueue();
  	});
  }

  $scope.getQueue();

  window.setInterval(function(){
  	$scope.getQueue();
  }, 3500)

}]);