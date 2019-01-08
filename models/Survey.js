const mongoose = require('mongoose');
const { Schema } = mongoose;
const recipientSchema = require('./Recipient');

const surveySchema = new Schema({
	title: String,
	subject: String,
	body: String,
	recipients: [recipientSchema],
	yes: { type: Number, default: 0 },
	no: { type: Number, default: 0 },
	_user: { type: Schema.Types.ObjectId, ref: 'User' }, // establishes relationship between survey and a particular User
	dateSend: Date,
	lastResponded: Date,
});

mongoose.model('surveys', surveySchema);
