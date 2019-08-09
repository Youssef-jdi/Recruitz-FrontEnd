import { userConstants } from '../_constants';
const INITIAL_STATE = {
	isPassed: false,
	user : {}
};

export const isPassed = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case userConstants.ISQUIZ_PASSED_PENDING:
			return { ...state, isPassed: false };
		case userConstants.ISQUIZ_PASSED_SUCCESS:
			return { ...state, isPassed: action.payload.isPassed , user : action.payload.user };
		case userConstants.ISQUIZ_PASSED_FAILURE:
			return { ...state, isPassed: false };
		default:
			return state;
	}
};
