// Filename starts with a capital letter, because it exports a class
const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('./../config/keys');

class Mailer extends helper.Mail {
	// Class takes in 2 arguments: survey and template
	constructor({ subject, recipients }, content) {
		super();

		// These are build-in properties from the Mail class
		this.from_email = new helper.Email('no-reply@emaily.com');
		this.subject = subject;
		this.body = new helper.Content('text/html', content);
		this.recipients = this.formatAddresses(recipients);
		this.addContent(this.body);
		// This is a custom method to do click tracking in mail
		this.addClickTracking();
	}

	addClickTracking() {
		// This is textbook Sendgrid options to enable click tracking
		const trackingSettings = new helper.TrackingSettings();
		const clickTracking = new helper.ClickTracking(true, true);

		trackingSettings.setClickTracking(clickTracking);
		this.addTrackingSettings(trackingSettings);
	}

	formatAddresses(recipients) {
		// We first take out the email address from each recipient
		return recipients.map(({ emailAddress }) => {
			// Then we return the email address in the Sendgrid format
			return new helper.Email(emailAddress);
		});
	}
}

module.exports = Mailer;
