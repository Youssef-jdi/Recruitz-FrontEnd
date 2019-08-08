import { userConstants } from '../_constants';
const INITIAL_STATE = {
	isPassed: false
};

export const isPassed = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case userConstants.ISQUIZ_PASSED_PENDING:
			return { ...state, isPassed: false };
		case userConstants.ISQUIZ_PASSED_SUCCESS:
			return { ...state, isPassed: action.payload.isPassed };
		case userConstants.ISQUIZ_PASSED_FAILURE:
			return { ...state, isPassed: false };
		default:
			return state;
	}
};
