// Import PassportJS and Auth strategies
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

// Import client ID/client secret
const keys = require('../config/keys');

// Import Mongoose get User model
const mongoose = require('mongoose');
const User = mongoose.model('users');

// Get data from a user object (the Mongoose model)
// to store in a cookie for session (serialize)
passport.serializeUser((user, done) => {
	// The first argument of done() is an error object
	done(null, user.id);
});

// Take user.id and turn it back into a user object (deserialize)
passport.deserializeUser((userId, done) => {
	User.findById(userId)
		.then(user => {
			done(null, user);
		})
		.catch(error => console.log('Something went wrong with deserialization!', error));
});

// Instantiate GoogleStrategy for Passport
passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
			proxy: true,
		},
		async (accessToken, refreshToken, profile, done) => {
			// First check if User already exists
			const existingUser = await User.findOne({ googleId: profile.id });

			if (existingUser) {
				// User already exists
				done(null, existingUser);
			} else {
				// Creates instance of new User => record in DB
				// Save() persists the data
				new User({ googleId: profile.id }).save().then(newUser => done(null, newUser));
			}
		}
	)
);

// Instantiate FacebookStrategy for Passport
passport.use(
	new FacebookStrategy(
		{
			clientID: keys.facebookAppId,
			clientSecret: keys.facebookAppSecret,
			callbackURL: '/auth/facebook/callback',
			proxy: true,
		},
		async (accessToken, refreshToken, profile, done) => {
			// First check if User already exists
			const existingUser = await User.findOne({ facebookId: profile.id });

			if (existingUser) {
				// User already exists
				done(null, existingUser);
			} else {
				// Creates instance of new User => record in DB
				// Save() persists the data
				new User({ facebookId: profile.id }).save().then(newUser => done(null, newUser));
			}
		}
	)
);
