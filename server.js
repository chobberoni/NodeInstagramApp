// GRAB THE PACKAGES/VARIABLES WE NEED
// ==================================================
var express = require('express');
var app = express();
var ig = require('instagram-node').instagram();

// CONFIGURE THE APP
// ==================================================
// tell node where to look for site resources
app.use(express.static(__dirname + '/public'));
// set the view engine to ejs
app.set('view engine', 'ejs');

// configure instagram app with client-id
// configure instagram app with client_id
ig.use({

	client_id: '425066d4617f4c83b32c770bc42981b6',
	client_secret: 'c2065d481d134f10af6e37bd4694b2de'

});


//ig.user_media_recent('user_id', [options,] function(err, medias, pagination, remaining, limit) {});


// SET THE ROUTES
// ===================================================
// home page route - popular images
app.get('/', function(req, res) {

	// use the instagram package to get popular media
	// change '42094813' to your own user id to get your feed. 
	// i used jelled to find out my instagram user id
	ig.user_media_recent('42094813', function(err, medias, pagination, remaining, limit) {
		// render the home page and pass in the popular images
		res.render('pages/index', { grams: medias });
	});
	
});

// START THE SERVER
// ==================================================
app.listen(8080);
console.log('App started! Look at http://localhost:8080');