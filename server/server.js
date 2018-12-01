const express = require('express');

// Importing Passport settings
require('../services/passport');

// Importing routres
const authRoutes = require('../routes/auth');

// Create Express server instance
const app = express();

// Use routes
authRoutes(app);

// Dynamic PORT binding
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}!`);
});
