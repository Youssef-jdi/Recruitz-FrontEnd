import { quizConstants } from '../_constants';

const INITIAL_STATE = {
	success: false,
	id : 0
};

export const deleteQuiz = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case quizConstants.DELETE_QUIZ_REQUEST:
			return { ...state, success: false };
		case quizConstants.DELETE_QUIZ_SUCCESS:
			return { ...state, success: action.payload.success , id : action.id };
		case quizConstants.DELETE_QUIZ_FAILURE:
			return { ...state, success: false };
		default:
			return state;
	}
};
//,quiz:[].concate(action.payload)