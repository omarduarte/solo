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
    title: 'Oh babey',
    artist: 'The Rollercoasters',
    album: 'Are we high?',
    genre: 'Electro-Maldivan-Folk'
  });

  song.save(function(err, song) {
    if (err) { throw err; }
  });

});

app.get('/api/songs', function(req, res) {
  Song.find(function(err, songs) {
    res.send(200, songs);
  });
});

app.get('/api/queue', function(req, res) {
  Queue.find(function(err, queue) {
    if (err) { throw err; }
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

app.put('/api/queue', function(req, res) {
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