import { userConstants } from '../_constants';

const INITIAL_STATE = {
	loading: false,
	message: '',
	messageColor: '#fff',
	success: false,
	user: {}
};

export const SignIn = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case userConstants.LOGIN_REQUEST:
			return { ...state, loading: true, success: false };
		case userConstants.LOGIN_SUCCESS:
			return {
				...state,
				loading: false,
				message: action.payload.message,
				user: action.payload.user,
				messageColor: 'green',
				success: true
			};
		case userConstants.LOGIN_FAILURE:
			return { ...state, loading: false, message: action.error, messageColor: 'red', success: false };
		default:
			return state;
	}
};
