import { quizConstants } from '../_constants';

const INITIAL_STATE = {
	success: false
};

export const deleteQuiz = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case quizConstants.DELETE_QUIZ_REQUEST:
			return { ...state, success: false };
		case quizConstants.DELETE_QUIZ_SUCCESS:
			return { ...state, success: action.payload.success };
		case quizConstants.DELETE_QUIZ_FAILURE:
			return { ...state, success: false };
		default:
			return state;
	}
};
