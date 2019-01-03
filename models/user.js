const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create a new Schema for the User document model
const userSchema = new Schema({
	googleId: String,
	facebookId: String,
	stripeData: Object,
});

// Assign label of 'users' to the User schema
mongoose.model('users', userSchema);
