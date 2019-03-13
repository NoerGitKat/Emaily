import axios from 'axios';

// Import action types
import { FETCH_USER, SUBMIT_SURVEY, FETCH_SURVEYS } from './types';

export const fetchUser = () => {
	// Sending GET request to Express server to get data current user
	return async dispatch => {
		// Redux Thunk gives us direct access to dispatch function
		const currentUser = await axios.get('/api/current_user');
		dispatch({ type: FETCH_USER, currentUser: currentUser.data });
	};
};

export const handleStripeToken = token => {
	// Send token obj to backend to (1) update User model
	// and (2) update credits in state
	return async dispatch => {
		const stripeToken = await axios.post('api/stripe', token);

		// Dispatch FETCH_USER to set token data in User model
		dispatch({ type: FETCH_USER, currentUser: stripeToken.data });
	};
};

export const submitSurvey = (values, history) => {
	return async dispatch => {
		const res = await axios.post('/api/surveys', values); // Send SurveyForm values to backend
		history.push('/'); // Send user to dashbaord
		dispatch({ type: FETCH_USER, currentUser: res.data }); // Update User object
	};
};

export const fetchSurveys = () => {
	return async dispatch => {
		const res = await axios.get('/api/surveys');
		dispatch({ type: FETCH_SURVEYS, surveys: res.data });
	};
};
