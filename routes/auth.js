const express = require('express');
const passport = require('passport');

// Create Express server instance
const app = express();

module.exports = app => {
	// Create GET route for Google Authentication
	app.get(
		'/auth/google',
		// The Google Strategy has an internal identifier called 'google'
		passport.authenticate('google', {
			scope: ['profile', 'email'],
		})
	);

	// Create GET route for handling callback Google Authentication
	app.get('/auth/google/callback', passport.authenticate('google'));

	// GET route for Facebook Authentication
	app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'read_stream' }));

	// GET route for handling callback Facebook Authentication
	app.get('/auth/facebook/callback', (req, res) => {
		passport.authenticate('facebook');
	});

	app.get('/api/current_user', (req, res) => {
		console.log('req.user', req.user);
		res.send(req.user);
	});
};
