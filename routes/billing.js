const keys = require('./../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

// Import Mongoose get User model
const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = app => {
	// POST Stripe token
	app.post('/api/stripe', async (req, res) => {
		const createdStripeCharge = await stripe.charges.create({
			amount: 500,
			currency: 'usd',
			description: '$5 for 5 credits',
			source: req.body.id,
		});
		console.log('createdStripeCharge', createdStripeCharge);
	});
};
