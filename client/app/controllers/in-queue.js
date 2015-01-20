angular.module('HearMeRoar.inQueue', [])

.controller('InQueueController', ['$scope',function($scope) {

	$scope.redirectTo = function(place) {
		window.location.href = '/#/' + place;
	}
}]);