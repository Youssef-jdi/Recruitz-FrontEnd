import { userConstants } from '../_constants';

const INITIAL_STATE = {
	success: false,
	candidates: []
};

export const getAllCandidates = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case userConstants.GET_CANDIDATES_PENDING:
			return { ...state, success: false, candidates: [] };
		case userConstants.GET_CANDIDATES_SUCCESS:
			return { ...state, success: action.payload.success, candidates: action.payload.candidates };
		case userConstants.GET_CANDIDATES_FAILURE:
			return { ...state, success: false, candidates: [] };
		default:
			return state;
	}
};
