import { quizConstants } from '../_constants';

const INITIAL_STATE = {
	success: 0,
	quiz: {}
};

export const passQuiz = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case quizConstants.QUIZ_PASS_REQUEST:
			return { ...state, success: 2, quiz: {} };
		case quizConstants.QUIZ_PASS_SUCCESS:
			return { ...state, success: action.payload.success, quiz: action.payload.quiz };
		case quizConstants.QUIZ_PASS_FAILURE:
			return { ...state, success: 0, quiz: {} };
		default:
			return state;
	}
};
