var db = require('../config');
var mongoose = require('mongoose');

var songSchema = mongoose.Schema({
    title: String,
    artist: String,
    album: String,
    genre: String
});

var Song = mongoose.model('Song', songSchema);

module.exports = Song;
