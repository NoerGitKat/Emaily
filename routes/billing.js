const keys = require('./../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('./../middlewares/requireLogin');

module.exports = app => {
	// POST Stripe token (protected route)
	app.post('/api/stripe', requireLogin, async (req, res) => {
		const createdStripeCharge = await stripe.charges.create({
			amount: 500,
			currency: 'usd',
			description: '$5 for 5 credits',
			source: req.body.id,
		});

		// Add 5 credits to User model
		req.user.credits += 5;
		// Save new user instance to model
		const user = await req.user.save();
		console.log('what is user in this route?', user);
		res.send(user);
	});
};
