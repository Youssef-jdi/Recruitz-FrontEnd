import { userConstants } from '../_constants'


const INITIAL_STATE = {
    success : false,
    quiz : {}
}

export const save = (state = INITIAL_STATE , action) => {
    switch(action.type) {
        case userConstants.REGISTER_CANDIDATE_PENDING:
            return{...state , success : false}
        case userConstants.REGISTER_CANDIDATE_SUCCESS:
            return{...state , success : true}
        case userConstants.REGISTER_CANDIDATE_FAILURE:
            return{...state , success : false}
        default: 
            return state
    }
}