var db = require('../config');
var mongoose = require('mongoose');

var queueSchema = mongoose.Schema({
    songID: String,
    clientName: String,
    hasBeenPlayed: {type: Boolean, default: false},
    createdAt: Date
});

var Queue = mongoose.model('Queue', queueSchema);

module.exports = Queue;
