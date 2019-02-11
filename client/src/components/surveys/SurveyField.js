import React from 'react';

const SurveyField = ({ input, label, name }) => {
	return (
		<div>
			<label>{label}</label>
			<input {...input} />
		</div>
	);
};

export default SurveyField;
