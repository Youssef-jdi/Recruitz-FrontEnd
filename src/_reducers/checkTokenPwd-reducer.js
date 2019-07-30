import {userConstants} from '../_constants'


const INITIAL_STATE = {
    success : true,
    user : {}
}

export const checkUserTokenPwd = (state = INITIAL_STATE,action) => {
    switch(action.type) {
        case userConstants.UPDATE_PASSWORD_REQUEST:
            return{...state,success:true,user:null}
        case userConstants.UPDATE_PASSWORD_SUCCESS:
            return{...state,success:action.payload.success,user:action.payload.user}
        case userConstants.UPDATE_PASSWORD_FAILURE:
            return{...state,success:false,user:null}
        default:
            return state
    }
}