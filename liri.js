require("dotenv").config();
var keys = require('./keys.js');
var request = require('request');
// var Twitter = require('twitter');
var fs = require("fs");
var Spotify = require('node-spotify-api');


var userCommand = process.argv[2];
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says

var userSearch = process.argv[3];
// artist
// song
// movie

switch (userCommand) {
	case "my-tweets":
	twitter(userSearch);
	break;

	case "spotify-this-song":
	spotify(userSearch);
	break;

	case "movie-this":
	movie(userSearch);
	break;

	case "do-what-it-says":
	doit();
	break;
};

function spotify(userSearch) {

	var spotify = new Spotify(keys.spotify);
		if (!userSearch){
        	userSearch = 'The Sign';
    	}
		spotify.search({ type: 'track', query: userSearch}, function(err, data) {
			if (err){
	            console.log('Error occurred: ' + err);
	            return;
	        }

	        var songInfo = data.tracks.items;
	        console.log("Artist(s): " + songInfo[0].artists[0].name);
	        console.log("Song Name: " + songInfo[0].name);
	        console.log("Preview Link: " + songInfo[0].preview_url);
	        console.log("Album: " + songInfo[0].album.name);
	});
}

