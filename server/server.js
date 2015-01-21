var express = require('express');
var Song = require('./app/models/song.js');
var Queue = require('./app/models/queue.js');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));


app.get('/addsong', function(req, res) {
  var song = new Song({
    title: 'Cane',
    artist: 'Releive',
    album: 'Mufase',
    genre: 'Samba'
  });

  song.save(function(err, song) {
    if (err) { throw err; }
    res.sendStatus(200);
  });

});

app.get('/api/songs', function(req, res) {
  Song.find(function(err, songs) {
    res.send(200, songs);
  });
});

app.post('/api/song', function(req, res) {
  var song = new Song({
    title: req.body.title,
    artist: req.body.artist,
    album: req.body.album,
    genre: req.body.genre
  });
  
  song.save(function(err, song) {
    if (err) { throw err; }
    res.sendStatus(201);
  });
});

app.get('/api/song', function(req, res) {
  var songID = req.body.songID;
  Song.find({ _id: songID }, function(err, song) {
    if (err) { throw err; }
    res.send(200, song);
  });
});

app.delete('/api/song/:_id', function(req, res) {
  var songID = req.params._id;
  console.log(songID);
  Song.remove({ _id: songID }, function(err) {
    if (err) { throw err; }
    console.log('Probably deleted.')
    res.sendStatus(201);
  });
});

app.get('/api/queue', function(req, res) {
  Queue.find({ hasBeenPlayed: false}).sort('createdAt').exec(function(err, queue) {
    res.send(200, queue);
  });
});

app.post('/api/queue', function(req, res) {
  var clientName = req.body.clientName;
  var artist = req.body.artist;
  var title = req.body.title;
  var songID = req.body.songID;

  var queueItem = new Queue({
    artist: artist,
    title: title,
    clientName: clientName,
    songID: songID    
  });

  queueItem.save(function(err, q) {
    if (err) { throw err; }
    res.send(201, q);
  });

});

app.get('/api/next-song', function(req, res) {
  Queue.update({nowPlaying: true}, { hasBeenPlayed: true, nowPlaying: false }, function(err, numAffected, raw) {
    Queue.find({ hasBeenPlayed: false}).sort('createdAt').exec(function(err, queue) {
      if (queue) {
        queue[0].nowPlaying = true;
        console.dir(queue);
        queue[0].save(function(err, queueItem) {
          if (err) { throw err; }
          res.send(200, queue);
        });
      } else {
        res.send(200, []);
      }
    });
  });
});

app.get('/displayQueue', function(req, res) {
  Queue.find().sort('createdAt').exec(function(err, queue) {
    console.dir(queue);
    res.sendStatus(200);
  });
});

app.delete('/api/queue/:_id', function(req, res) {
  var queueID = req.params._id;
  Queue.remove({ _id: queueID }, function(err) {
    if (err) { throw err; }
    res.sendStatus(201);
  });
});


app.listen(9432);