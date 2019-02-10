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
	// Get survey overview page(protected route)
	app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
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
		mailer.send();
	});
};
