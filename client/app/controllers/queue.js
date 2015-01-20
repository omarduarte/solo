angular.module('HearMeRoar.queue', ['HearMeRoar.api.services'])

.controller('QueueController', ['$scope', 'Queue', function($scope, Queue) {
  $scope.queue;
  $scope.nowPlaying;

  $scope.getQueue = function() {
    Queue.getAll().then(function(queue) {
      $scope.queue = queue.data;
      $scope.nowPlaying = $scope.queue.shift();
    });
  };

  $scope.getQueue();

  window.setInterval(function(){
  	$scope.getQueue();
  }, 3500)

}]);