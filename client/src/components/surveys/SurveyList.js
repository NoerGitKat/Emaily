import React from 'react';
import SurveyListItem from './SurveyListItem';

const SurveyList = ({ surveys }) => {
	return surveys.map((survey, i) => <SurveyListItem survey={survey} key={i} />);
};

export default SurveyList;
