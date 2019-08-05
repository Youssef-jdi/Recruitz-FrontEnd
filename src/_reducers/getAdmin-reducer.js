import { userConstants } from '../_constants';
const INITIAL_STATE = {
	success: false,
	user: {}
};

export const getAdmin = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case userConstants.GET_ADMIN_PENDING:
			return { ...state, success: false, user: {} };
		case userConstants.GET_ADMIN_SUCCESS:
			return { ...state, success: action.payload.success, user: action.payload.user };
		case userConstants.GET_ADMIN_FAILURE:
			return { ...state, success: false, user: {} };
		default:
			return state;
	}
};
