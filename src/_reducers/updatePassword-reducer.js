import {userConstants} from '../_constants'


const INITIAL_STATE = {
    successUpdate : false,
    user : {}
}

export const updatePassword = (state = INITIAL_STATE,action) => {
    switch(action.type) {
        case userConstants.UPDATE_REQUEST:
            return{...state,successUpdate:false,user:null}
        case userConstants.UPDATE_SUCCESS:
            return{...state,successUpdate:action.payload.success,user:action.payload.user}
        case userConstants.UPDATE_FAILURE:
            return{...state,successUpdate:false,user:null}
        default:
            return state
    }
}