import { userConstants } from '../_constants';


const INITIAL_STATE = {
  loading:false,
  message:'',
  messageColor:'#fff'
}

export const registration = (state = INITIAL_STATE, action)=> {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { ...state,loading: true };
    case userConstants.REGISTER_SUCCESS:
      return {...state,loading:false,message:action.payload,messageColor:'green'};
    case userConstants.REGISTER_FAILURE:

      return {...state,loading:false,message:action.error,messageColor:'red' };
    default:
      return state
  }
}