import { FETCH_USER } from './../actions/types';

// const initialState = {};

export default (state = null, action) => {
	switch (action.type) {
		case FETCH_USER:
			return action.currentUser || false;
		default:
			return state;
	}
};
