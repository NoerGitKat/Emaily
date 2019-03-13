import React from 'react';
import { Link } from 'react-router-dom';
import * as actions from './../actions';
import { connect } from 'react-redux';

import SurveyList from './surveys/SurveyList';

const Dashboard = ({ surveys, fetchSurveys }) => {
	if (surveys.length === 0) {
		fetchSurveys();
	}
	return (
		<div id="dashboard">
			<SurveyList surveys={surveys} />
			<div className="fixed-action-btn">
				<Link to="/surveys/new" className="btn-floating btn-large red">
					<i className="material-icons">add</i>
				</Link>
			</div>
		</div>
	);
};

const mapStateToProps = state => {
	const { surveys } = state;
	return { surveys };
};

export default connect(
	mapStateToProps,
	actions
)(Dashboard);
