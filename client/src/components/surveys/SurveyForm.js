import React from 'react';
import { reduxForm, Field } from 'redux-form'; // Allows us to communicate to Redux store
import SurveyField from './SurveyField';

const FIELDS = [
	{ label: 'Survey Title', name: 'title' },
	{ label: 'Subject Line', name: 'subject' },
	{ label: 'Email Body', name: 'body' },
	{ label: 'Recipient List', name: 'emails' },
];

// reduxForm predefined functions/props only work with Classes
class SurveyForm extends React.Component {
	renderFields = () => {
		return FIELDS.map(field => <Field type="text" label={field.label} name={field.name} component={SurveyField} />);
	};

	render() {
		return (
			<div>
				<form onSubmit={this.props.handleSubmit(values => console.log(values))}>
					{this.renderFields()} <button type="submit">Submit!</button>
				</form>
			</div>
		);
	}
}

export default reduxForm({
	form: 'surveyForm',
})(SurveyForm);
