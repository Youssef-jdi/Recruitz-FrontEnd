import { quizConstants } from '../_constants'

const INITIAL_STATE = {
    success : false,
    quiz : {}
}

export const save = (state = INITIAL_STATE , action) => {
    switch(action.type) {
        case quizConstants.SAVE_REQUEST:
            return{...state , success : false}
        case quizConstants.SAVE_SUCCESS:
            return{...state , success : action.payload.success , quiz : action.payload.quiz}
        case quizConstants.SAVE_FAILURE:
            return{...state , success : false}
        default: 
            return state
    }
}