const passport = require('passport');

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
	app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
		res.redirect('/surveys');
	});

	// GET route for Facebook Authentication
	app.get('/auth/facebook', passport.authenticate('facebook'));

	// GET route for handling callback Facebook Authentication
	app.get('/auth/facebook/callback', (req, res) => {
		passport.authenticate('facebook');
	});

	// GET route for logout
	app.get('/api/logout', (req, res) => {
		// PassportJS appends a logout function (that removes the
		// user object in the cookie) to the req object
		req.logout();
		res.redirect('/');
	});

	// GET current user data (temp route)
	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});
};
