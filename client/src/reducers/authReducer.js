import { FETCH_USER } from './../actions/types';

const initialState = {};

export default (state = initialState, action) => {
	switch (action.type) {
		case FETCH_USER:
			return { ...state, user: action.currentUser.data || false };
		default:
			return state;
	}
};
