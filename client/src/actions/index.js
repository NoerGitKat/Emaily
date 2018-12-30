import axios from 'axios';

// Import action types
import { FETCH_USER } from './types';

export const fetchUser = user => {
	// Sending GET request to Express server to get data current user
	return dispatch => {
		axios.get('/api/current_user').then(user => dispatch({ type: FETCH_USER, user }));
	};
};
