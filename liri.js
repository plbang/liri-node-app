require("dotenv").config();
var keys = require('./keys.js');
var fs = require("fs");


var userCommand = process.argv[2];
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says

var userSearch = process.argv[3];
// artist
// song
// movie

