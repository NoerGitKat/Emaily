const express = require('express');
const mongoose = require('mongoose');

// Importing Passport settings
require('../services/passport');

// Importing routres
const authRoutes = require('../routes/auth');

const mongoURI = require('../config/keys').mongoURI;

// Connect with remote MongoDB server
mongoose.connect(
	mongoURI,
	{ useNewUrlParser: true }
);

// Create Express server instance
const app = express();

// Use routes
authRoutes(app);

// Dynamic PORT binding
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}!`);
});
