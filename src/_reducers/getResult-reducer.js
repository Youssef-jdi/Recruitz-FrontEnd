import { quizConstants } from '../_constants';
const INITIAL_STATE = {
	success: false,
	quiz: {},
	result: {}
};

export const getResult = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case quizConstants.GET_RESULT_REQUEST:
			return { ...state, success: false, quiz: {} };
		case quizConstants.GET_RESULT_SUCCESS:
			return {
				...state,
				success: action.payload.success,
				quiz: action.payload.quiz,
				user: action.payload.user
			};
		case quizConstants.GET_RESULT_FAILURE:
			return { ...state, success: false, quiz: {}, result: {} };
		default:
			return state;
	}
};
