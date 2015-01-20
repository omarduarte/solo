angular.module('HearMeRoar.api.services', [])

.factory('Song', ['$http', function($http) {
  var selectedSong;
  return {

    get: function(data) {
      return $http.get('/api/song');
    },

    getAll: function() {
      return $http.get('/api/songs');
    },

    pushToCache: function(song) {
      selectedSong = {
        _id:    song._id,
        title:  song.title,
        artist: song.artist,
        album:  song.album,
        genre:  song.genre
      }
    },

    getFromCache: function() {
      if (selectedSong) {
        return selectedSong;
      }
      return null;
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
      return $http.post('/api/queue', data)
    },
    
    // Takes in { queueID: ...}
    dequeue: function(data) {
      return $http.put('/api/queue', data)
    }
  };
}])