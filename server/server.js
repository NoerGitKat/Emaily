const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

// Require models
require('../models/user');

// Import Passport settings
require('../services/passport');

// Import routres
const authRoutes = require('../routes/auth');

// Import mLab connection URI
const mongoURI = require('../config/keys').mongoURI;

// Cookie Key
const cookieKey = require('../config/keys').cookieKey;

// Connect with remote MongoDB server (mLab)
mongoose.connect(
	mongoURI,
	{ useNewUrlParser: true }
);

// Create Express server instance
const app = express();

// Use cookie-session middleware in Express
app.use(
	cookieSession({
		// Establish session duration: 30 days until expiration
		maxAge: 30 * 24 * 60 * 60 * 1000,
		// Encrypt cookie with custom key
		keys: [cookieKey],
	})
);

// Initialize PassportJS
app.use(passport.initialize());

// Start session with PassportJS
app.use(passport.session());

// Temp route
app.get('/', (req, res) => {
	res.send('hello world!');
});

// Use routes
authRoutes(app);

// Dynamic PORT binding
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}!`);
});
