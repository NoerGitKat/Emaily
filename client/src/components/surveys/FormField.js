import React, { Fragment } from 'react';

const FormField = ({ label, fieldValue }) => {
	return (
		<Fragment>
			<label>{label}:</label>
			<div>{fieldValue}</div>
		</Fragment>
	);
};

export default FormField;
