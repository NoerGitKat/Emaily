const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

// Require models
require('./models/user');

// Import Passport settings
require('./services/passport');

// Import routres
const authRoutes = require('./routes/auth');
const billingRoutes = require('./routes/billing');

// Import mLab connection URI
const mongoURI = require('./config/keys').mongoURI;

// Cookie Key
const cookieKey = require('./config/keys').cookieKey;

// Connect with remote MongoDB server (mLab)
mongoose.connect(
	mongoURI,
	{ useNewUrlParser: true }
);

// Create Express server instance
const app = express();

// Use cookie-session middleware in Express
// Middleware preprocesses request data before it is send off
// to routes
app.use(
	cookieSession({
		// Establish session duration: 30 days until expiration
		maxAge: 30 * 24 * 60 * 60 * 1000,
		// Encrypt cookie with custom key
		keys: [cookieKey],
	})
);

// Initialize PassportJS middleware
app.use(passport.initialize());

// Start session with PassportJS
app.use(passport.session());

// Initialize bodyParser middleware
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Parse application/json
app.use(bodyParser.json());

// Temp route
app.get('/', (req, res) => {
	res.send('hello world!');
});

// Use routes
authRoutes(app);
billingRoutes(app);

if (process.env.NODE_ENV === 'production') {
	// In prod Express will serve frontend build files
	app.use(express.static('client/build'));

	// If Express doesnt recognize route in URL, serve index.html
	// and let React Router handle it
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

// Dynamic PORT binding
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}!`);
});
