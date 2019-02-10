const requireLogin = require('./../middlewares/requireLogin');
const requireCredits = require('./../middlewares/requireCredits');

// Directly importing Survey model to bypass tests
const mongoose = require('mongoose');
const Survey = mongoose.model('surveys');

// Import Mailer class to send Survey instance
const Mailer = require('./../services/Mailer');

// Import survey template to pass to Mailer
const surveyTemplate = require('./../services/emailTemplates/surveyTemplate');

module.exports = app => {
	app.get('/api/surveys/thanks', (req, res) => {
		res.send('Thanks for providing feedback!');
	});

	// Get survey overview page(protected route)
	app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
		// Get field values from survey form
		const { title, subject, body, recipients } = req.body;

		// Create new Survey instance
		const newSurvey = new Survey({
			title,
			subject,
			body,
			recipients: recipients.split(',').map(email => ({ email: email.trim() })),
			_user: req.user.id, // Saves ID of user that created Survey
			dateSent: Date.now(),
		});

		// Send Survey with Mailer
		const mailer = new Mailer(newSurvey, surveyTemplate(newSurvey));

		// General error handling
		try {
			// Async because it is an API call
			await mailer.send();

			// After sending the email we save the survey to DB
			await newSurvey.save();

			// After sending the email we want to deduct a credit from user
			req.user.credits -= 1;
			const user = await req.user.save();

			res.send(user);
		} catch (err) {
			res.status(422).send(err);
		}
	});
};
