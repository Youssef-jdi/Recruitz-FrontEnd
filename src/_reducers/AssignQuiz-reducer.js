import { quizConstants } from '../_constants';

const INITIAL_STATE = {
	success: false
};

export const AssignQuiz = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case quizConstants.ASSIGN_QUIZTOUSER_REQUEST:
			return { ...state, success: false };
		case quizConstants.ASSIGN_QUIZTOUSER_SUCCESS:
			return { ...state, success: action.payload.success };
		case quizConstants.ASSIGN_QUIZTOUSER_FAILURE:
			return { ...state, success: false };
		default:
			return state;
	}
};
