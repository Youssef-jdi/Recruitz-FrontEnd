import { userConstants } from '../_constants';
const INITIAL_STATE = {};

export const startQuiz = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case userConstants.START_QUIZ_PENDING:
			return { ...state };
		case userConstants.START_QUIZ_SUCCESS:
			return { ...state };
		case userConstants.START_QUIZ_FAILURE:
			return { ...state };
		default:
			return state;
	}
};
