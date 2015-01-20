angular.module('HearMeRoar.queue', ['HearMeRoar.api.services'])

.controller('QueueController', ['$scope', 'Queue', function($scope, Queue) {
  $scope.queue;

  $scope.getQueue = function() {
    Queue.getAll().then(function(queue) {
      $scope.queue = queue.data;
    });
  };

  $scope.getQueue();

}]);