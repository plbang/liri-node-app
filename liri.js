require("dotenv").config();
var keys = require("./keys.js");
var request = require("request");
var fs = require("fs");
var Spotify = require("node-spotify-api");

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

function spotify(userSearch) {
  var spotify = new Spotify(keys.spotify);
  if (!userSearch) {
    userSearch = "The Sign";
  }
  spotify.search({ type: "track", query: userSearch }, function(err, data) {
    if (err) {
      console.log("Error occurred: " + err);
      return;
    }

    var songInfo = data.tracks.items;
    console.log("Artist(s): " + songInfo[0].artists[0].name);
    console.log("Song Name: " + songInfo[0].name);
    console.log("Preview Link: " + songInfo[0].preview_url);
    console.log("Album: " + songInfo[0].album.name);
  });
}

function concert(userSearch) {
  var queryURL =
    "https://rest.bandsintown.com/artists/" +
    userSearch +
    "/events?app_id=codingbootcamp";
}






function movie(userSearch) {

 	var queryUrl =
    "http://www.omdbapi.com/?t=" + userSearch + "&y=&plot=short&apikey=trilogy";

  request(queryUrl, function(error, response, body) {
    if (!userSearch) {
      userSearch = "Mr. Nobody";
    }
    if (!error && response.statusCode === 200) {		
		console.log("Title: " + JSON.parse(body).Title);
		console.log("Release Year: " + JSON.parse(body).Year);
		console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
		console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
		console.log("Country: " + JSON.parse(body).Country);
		console.log("Language: " + JSON.parse(body).Language);
		console.log("Plot: " + JSON.parse(body).Plot);
		console.log("Actors: " + JSON.parse(body).Actors);
    }
  });
}
