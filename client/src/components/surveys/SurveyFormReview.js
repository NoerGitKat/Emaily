import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { default as formFields } from './formFields';
import FormField from './FormField';
import * as actions from './../../actions';

const SurveyFormReview = ({ switchToForm, formValues, submitSurvey }) => {
	return (
		<Fragment>
			<h5>Please confirm your entries</h5>
			{formFields.map((field, i) => {
				return <FormField key={i} label={field.label} fieldValue={formValues[field.name]} />;
			})}
			<button className="yellow left btn-flat white-text darken-3" onClick={switchToForm}>
				<i className="material-icons left">arrow_back</i>
				Back
			</button>
			<button className="green btn-flat right white-text" onClick={() => submitSurvey(formValues)}>
				Send Survey <i className="material-icons right">email</i>
			</button>
		</Fragment>
	);
};

const mapStateToProps = state => {
	const { values } = state.form.surveyForm;
	return {
		formValues: values,
	};
};
export default connect(
	mapStateToProps,
	actions
)(SurveyFormReview);
