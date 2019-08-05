import { quizConstants } from '../_constants';
const INITIAL_STATE = {
	success: false,
	quizes: []
};

export const getAllQuizes = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case quizConstants.GET_ALL_QUIZES_REQUEST:
			return { ...state, success: false, quizes: [] };
		case quizConstants.GET_ALL_QUIZES_SUCCESS:
			return { ...state, success: action.payload.success, quizes: action.payload.quizes };
		case quizConstants.GET_ALL_QUIZES_FAILURE:
			return { ...state, success: false, quizes: [] };
		default:
			return state;
	}
};
