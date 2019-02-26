import React, { Fragment } from 'react';
import { reduxForm, Field } from 'redux-form'; // Allows us to communicate to Redux store directly
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import { validateEmails } from './../../utils';
import { default as formFields } from './formFields';

// reduxForm predefined functions/props only work with Classes
class SurveyForm extends React.Component {
	renderFields = () => {
		return formFields.map((field, i) => (
			<Field type="text" key={i} label={field.label} name={field.name} component={SurveyField} />
		));
	};

	render() {
		return (
			<Fragment>
				{/* Handlesubmit function comes from redux-form */}
				<form onSubmit={this.props.handleSubmit(this.props.switchToReview)}>
					{this.renderFields()}
					<div className="formButtons">
						<Link to="/surveys">
							<button className="red btn-flat left white-text">Cancel</button>
						</Link>
						<button type="submit" className="teal btn-flat right white-text">
							Next
							<i className="material-icons right">done</i>
						</button>
					</div>
				</form>
			</Fragment>
		);
	}
}

function validateFields(formValues) {
	const errors = {};

	errors.emails = validateEmails(formValues.emails || '');

	if (!formValues.title) {
		errors.title = 'You must provide a title!';
	}
	if (!formValues.subject) {
		errors.subject = 'You must provide a subject line!';
	}
	if (!formValues.body) {
		errors.body = 'You must provide email content!';
	}
	if (!formValues.emails) {
		errors.emails = 'You must insert at least 1 valid email address!';
	}

	return errors;
}

export default reduxForm({
	validate: validateFields,
	form: 'surveyForm',
	destroyOnUnmount: false,
})(SurveyForm);
