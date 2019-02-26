import React, { Fragment } from 'react';

const SurveyField = ({ input, label, name, meta }) => {
	const errorMsg = meta.touched ? meta.error : '';

	return (
		<Fragment>
			<label>{label}</label>
			<input {...input} />
			<div>{errorMsg}</div>
		</Fragment>
	);
};

export default SurveyField;
