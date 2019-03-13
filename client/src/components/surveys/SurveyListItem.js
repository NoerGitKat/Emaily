import React from 'react';

const SurveyListItem = ({ survey }) => {
	return (
		<div className="card bue-grey darken-1">
			<div className="card-content">
				<span className="card-title">{survey.title}</span>
				<p>{survey.body}</p>
				<div className="card-action">
					<a>Yes: {survey.yes}</a>
					<a>No: {survey.no}</a>
				</div>
			</div>
		</div>
	);
};

export default SurveyListItem;
