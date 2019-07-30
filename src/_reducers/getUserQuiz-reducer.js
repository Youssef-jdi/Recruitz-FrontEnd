import { quizConstants } from '../_constants'

const INITIAL_STATE = {
    success : false,
    quizes : []
}

export const getUserQuiz = (state = INITIAL_STATE , action) => {
    switch(action.type) {
        case quizConstants.USER_QUIZES_REQUEST:
            return{...state , success : false , quizes : []}
        case quizConstants.USER_QUIZES_SUCCESS:
            return{...state , success : action.payload.success , quizes : action.payload.quizes}
        case quizConstants.USER_QUIZES_FAILURE:
            return{...state , success : false , quizes : []}
        default: 
            return state
    }
}