// Filename starts with a capital letter, because it exports a class
const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
	// Class takes in 2 arguments: survey and template
	constructor({ subject, recipients }, content) {
		super();

		// These are build-in properties from the Mail class

		this.from_email = new helper.Email('no-reply@emaily.com');
		this.subject = subject;
		this.body = new helper.Content('text/html', content);
		this.recipients = this.formatAddresses(recipients);
		// The sgApi returns a signature we can use to send the email using SendGrid API
		this.sgApi = sendgrid(keys.sendGridKey);

		this.addContent(this.body);
		// This is a custom method to do click tracking in mail
		this.addClickTracking();
		this.addRecipients();
	}

	formatAddresses(recipients) {
		// We first take out the email address from each recipient
		return recipients.map(({ email }) => {
			// Then we return the email address in the Sendgrid format
			return new helper.Email(email);
		});
	}

	addClickTracking() {
		// This is textbook Sendgrid options to enable click tracking
		const trackingSettings = new helper.TrackingSettings();
		const clickTracking = new helper.ClickTracking(true, true);

		trackingSettings.setClickTracking(clickTracking);
		this.addTrackingSettings(trackingSettings);
	}

	addRecipients() {
		// Personalizations are metadata about the email, like recipients/subject line/headers/etc.
		const personalize = new helper.Personalization();

		this.recipients.forEach(recipient => {
			// This SendGrid function adds the personalization (in this case: recipient) to
			// 		// each email
			personalize.addTo(recipient);
		});
		this.addPersonalization(personalize);
	}

	// An API call is usually an async request
	async send() {
		// Create request for SendGrid API
		const request = this.sgApi.emptyRequest({
			method: 'POST',
			path: '/v3/mail/send',
			body: this.toJSON(),
		});
		// Send email and return response
		const response = await this.sgApi.API(request);
		return response;
	}
}

module.exports = Mailer;
