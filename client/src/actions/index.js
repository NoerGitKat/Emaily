import axios from 'axios';

// Import action types
import { FETCH_USER } from './types';

export const fetchUser = () => {
	// Sending GET request to Express server to get data current user
	return async dispatch => {
		// Redux Thunk gives us direct access to dispatch function
		const currentUser = await axios.get('/api/current_user');
		dispatch({ type: FETCH_USER, currentUser });
	};
};
