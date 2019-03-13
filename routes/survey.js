// /surveys is a protected route, therefore the following failsaves
const requireLogin = require('./../middlewares/requireLogin');
const requireCredits = require('./../middlewares/requireCredits');

const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');

// Directly importing Survey model to bypass tests
const mongoose = require('mongoose');
const Survey = mongoose.model('surveys');

// Import Mailer class to send Survey instance
const Mailer = require('./../services/Mailer');

// Import survey template to pass to Mailer
const surveyTemplate = require('./../services/emailTemplates/surveyTemplate');

module.exports = app => {
	app.get('/api/surveys', requireLogin, async (req, res) => {
		// This route fetches all Surveys made by the logged in user
		const surveys = await Survey.find({ _user: req.user.id }).select({ recipients: false });

		res.send(surveys);
	});

	app.get('/api/surveys/:surveyId/:choice', (req, res) => {
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

	app.post('/api/surveys/webhooks', (req, res) => {
		const events = req.body.map(event => {
			const pathname = new URL(event.url).pathname;
			const p = new Path('/api/surveys/:surveyId/:choice');
			const match = p.test(pathname);

			if (match) {
				// return events that includes email, surveyId and choice (coming from the the right URL)
				return { email: event.email, surveyId: match.surveyId, choice: match.choice };
			}
		});

		const compactEvents = _.compact(events); // Removes 'undefined'
		const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId'); // Removes doubles

		uniqueEvents.forEach(({ surveyId, email, choice }) => {
			Survey.updateOne(
				// Find and update the specific Survey with correct id
				{
					_id: surveyId,
					recipients: {
						$elemMatch: { email: email, responded: false },
					},
				},
				{
					$inc: { [choice]: 1 }, // Mongo operator; allows for dynamic data
					$set: { 'recipients.$.responded': true },
					lastResponded: new Date(),
				}
			).exec();
		});

		res.send({});
	});
};
