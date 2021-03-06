// load up the dependencies
var Twit = require('twit');
var request = require('request');
var base64 = require('node-base64-image');

// load the local libs
// var gifLib = require('gitlib')

// We need to include our configuration file
var T = new Twit(require('./config/config.js'));

// The Giphy endpoint for a random gif
randomGIFURL = 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=current+status';

// Snag a random gif from Giphy
function getRandomGif(randomGIFURL) {
  request.get(randomGIFURL, function (error, response, body) {
    if (!error && response.statusCode == 200) {

      gifJSON = JSON.parse(body);
      gifURL = (gifJSON.data.image_url) 
      gifStaticURL = (gifJSON.data.fixed_height_small_still_url)

      // TODO: HEY this is a hack
      // One should remove this crap from the get function, and make it into its own thing
      updateStatusWithGif(gifURL);
      updateProfileImage(gifStaticURL);
    }
  })
}

// Tweets out the gif
function updateStatusWithGif(gifURL) {
  console.log("tweeting this URL: " + gifURL);
  tweetString = "Current status: " + gifURL;

  // tweet dat gif!
  T.post('statuses/update', { status: tweetString }, function(err, data, response) {
    if (response) {
      console.log('Success!')
    }
    // If there was an error with our Twitter call, we print it out here.
    if (err) {
      console.log('Twitter error:', error);
    }
  })
}

// Updates the bot's profile image
function updateProfileImage(gifStaticURL) {

  // base 64 encode that shiz
  var options = {string: true};
  base64.encode(gifStaticURL, options, function (err, image) {
  
  // catch errors
  if (err) {
    console.log(err);
  }

  // update the profile image on Twitter
  T.post('account/update_profile_image', { image: image }, function(err, data, response) {
    if (response) {
      console.log('Updating profile image to: ' + gifStaticURL)
    }
    // If there was an error with our Twitter call, we print it out here.
    if (err) {
      console.log('There was an error with Twitter:', err);
    }
    }); // hey this looks unnecessary or something.
  });

}

// Get dat gif doe
getRandomGif();


// ...and then every ten minutes after that. Time here is in milliseconds, so
// 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 120 = 120 minutes
// setInterval(getRandomGif, 1000 * 60 * 120);
