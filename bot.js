// load up the libs
var Twit = require('twit');
var request = require('request');
var base64 = require('node-base64-image');

// We need to include our configuration file
var T = new Twit(require('./config/config.js'));


function getRandomGif() {
	request.get('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=current+status', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	gifJSON = JSON.parse(body);
	    gifURL = (gifJSON.data.image_url) 
	    tweetGif(gifURL);
	  }
	})

	// request
	//   .get('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=current+status', {json:true})
	//   .on('response', function(response) {
	//     console.log(response.statusCode) // 200
	//     console.log(body) // 'image/png'
	//     gifURL = 'watwat';
	//     retweetLatest(gifURL);

	//   })
}

// This function finds the latest tweet with the #mediaarts hashtag, and retweets it.
function tweetGif(gifURL) {

	console.log(gifURL);

	tweetString = "current status: " + gifURL;

	// T.post('statuses/update', { status: tweetString }, function(err, data, response) {
	// 		if (response) {
	// 			console.log('Success! Check your bot, it should have retweeted something.')
	// 		}
	// 		// If there was an error with our Twitter call, we print it out here.
	// 		if (err) {
	// 			console.log('There was an error with Twitter:', err);
	// 		}
	// })



	profileImageURL = 'http://s3.amazonaws.com/giphygifs/media/Ggjwvmqktuvf2/100w_s.gif';
	var options = {string: true};

	base64.encode(profileImageURL, options, function (err, image) {
    if (err) {
        console.log(err);
    }
		T.post('account/update_profile_image', { image: image }, function(err, data, response) {
				if (response) {
					console.log('Should have updated the image')
				}
				// If there was an error with our Twitter call, we print it out here.
				if (err) {
					console.log('There was an error with Twitter:', err);
				}
		});

    console.log(image);
  });


}

// Get dat gif doe
getRandomGif();


// ...and then every ten minutes after that. Time here is in milliseconds, so
// 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 10 = 10 minutes
// setInterval(getRandomGif, 1000 * 60 * 10);
