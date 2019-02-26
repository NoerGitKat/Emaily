import React, { Fragment } from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';
import { reduxForm } from 'redux-form';

class SurveyNew extends React.Component {
	state = {
		showFormReview: false,
	};

	switchToReview = () => {
		this.setState({
			showFormReview: true,
		});
	};

	switchToForm = () => {
		this.setState({
			showFormReview: false,
		});
	};

	renderContent = () => {
		if (this.state.showFormReview) {
			return <SurveyFormReview switchToForm={this.switchToForm} />;
		} else {
			return <SurveyForm switchToReview={this.switchToReview} />;
		}
	};

	render() {
		return <Fragment>{this.renderContent()}</Fragment>;
	}
}

export default reduxForm({
	form: 'surveyForm',
})(SurveyNew);
