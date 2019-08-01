import { quizConstants } from '../_constants';

const INITIAL_STATE = {
    success : false 
};

export const finishQuiz = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case quizConstants.FINISH_QUIZ_REQUEST:
			return { ...state , success : false  };
		case quizConstants.FINISH_QUIZ_SUCCESS:
			return { ...state , success : action.payload.success };
		case quizConstants.FINISH_QUIZ_FAILURE:
			return { ...state , success : false };
		default:
			return state;
	}
};
