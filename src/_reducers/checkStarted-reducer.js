import { quizConstants } from '../_constants';

const INITIAL_STATE = {
	started: false,
	success: false
};

export const checkStarted = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case quizConstants.CHECK_STARTED_REQUEST:
			return { ...state, started: false, success: false };
		case quizConstants.CHECK_STARTED_SUCCESS:
			return { ...state, started: action.payload.started, success: action.payload.success };
		case quizConstants.CHECK_STARTED_FAILURE:
			return { ...state, started: false, success: false };
		default:
			return state;
	}
};
