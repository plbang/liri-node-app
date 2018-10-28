var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var request = require("request");
var fs = require("fs");
var Spotify = require("node-spotify-api");

var userCommand = process.argv[2];
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says

var userSearch = process.argv.slice(3).join(" ");
// artist
// song
// movie

switch (userCommand) {
  case "concert-this":
    concert(userSearch);
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
}

function concert(userSearch) {
	var queryURL =
	  "https://rest.bandsintown.com/artists/" +
	  userSearch +
	  "/events?app_id=codingbootcamp";

	request(queryURL, function(error, response, body) {
	var music = JSON.parse(body, null, 2);

	console.log("Venue: " + music[0].venue.name);
	console.log("Location: " + music[0].venue.city + ", " + music[0].venue.region)
	
	});

  };
  

function spotify(userSearch) {
  var spotify = new Spotify(keys.spotify);
  if (!userSearch) {
    userSearch = "The Sign";
  }
  spotify.search({ type: "track", query: userSearch }, function(err, data) {
    if (err) {
      console.log(err);
      return;
    }

    var songInfo = data.tracks.items;
    console.log("Artist(s): " + songInfo[0].artists[0].name);
    console.log("Song Name: " + songInfo[0].name);
    console.log("Preview Link: " + songInfo[0].preview_url);
    console.log("Album: " + songInfo[0].album.name);
  });
};


function movie(userSearch) {

 	var queryUrl =
    "http://www.omdbapi.com/?t=" + userSearch + "&y=&plot=short&apikey=trilogy";

  request(queryUrl, function(error, response, body) {
    if (!userSearch) {
      userSearch = "Mr. Nobody";
    }
    if (!error && response.statusCode === 200) {
		
		var omdb = JSON.parse(body, null, 2);
		
		console.log("Title: " + omdb.Title);
		console.log("Release Year: " + omdb.Year);
		console.log("IMDB Rating: " + omdb.imdbRating);
		console.log("Rotten Tomatoes Rating: " + omdb.Ratings[1].Value);
		console.log("Country: " + omdb.Country);
		console.log("Language: " + omdb.Language);
		console.log("Plot: " + omdb.Plot);
		console.log("Actors: " + omdb.Actors);
    }
  });
};

function doit () {

}
