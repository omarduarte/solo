angular.module('HearMeRoar.api.services', [])
.factory('Song', ['$http', function($http) {
  return {
    getAll: function() {
      return $http.get('/api/songs');
    }
  };
}])
.factory('Queue', ['$http', function($http) {
  return {

    getAll: function() {
      return $http.get('/api/queue');
    },

    // Takes in { clientName: ..., songID: ...}
    enqueue: function(data) {
      return $http.post('/api/enqueue', data)
    },
    
    // Takes in { queueID: ...}
    dequeue: function(data) {
      return $http.put('/api/dequeue', data)
    }
  };
}])