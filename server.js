var express = require('express');
var Song = require('./app/models/song.js');
var Queue = require('./app/models/queue.js');
var bodyParser = require('body-parser')

var app = express();


app.use(bodyParser.json());

app.get('/addsong', function(req, res) {
  var song = new Song({
    title: 'Oh babey',
    artist: 'The Rollercoasters',
    album: 'Are we high?',
    genre: Date.now() + ''
  });

  song.save(function(err, song) {
    if (err) { throw err; }
  });

});

app.get('/songs', function(req, res) {
  Song.find(function(err, songs) {
    res.send(200, songs);
  });
});

app.post('/enqueue', function(req, res) {
  var clientName = req.body.clientName;
  var songID = req.body.songID;

  var queueItem = new Queue({
    clientName: clientName,
    songID: songID    
  });

  queueItem.save(function(err, q) {
    if (err) { throw err; }
  });

});

app.put('/dequeue', function(req, res) {
  var id = req.body.queueID;
  Queue.update({_id: id}, {hasBeenPlayed: true}, function(err, numAffected, raw){

    res.sendStatus(201);
  });
  
});

app.get('/displayQueue', function(req, res) {
  Queue.find().sort('createdAt').exec(function(err, queue) {
    console.dir(queue);
    res.sendStatus(200);
  });

});


app.listen(9432);