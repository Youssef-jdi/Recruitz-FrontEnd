import { combineReducers } from 'redux';
import  { SignIn } from './login-reducer';
import { registration } from './register-reducer';
import { checkUserTokenPwd } from './checkTokenPwd-reducer';
import { updatePassword } from './updatePassword-reducer'
import { save } from './saveQuiz-reducer'
import { getUserQuiz } from './getUserQuiz-reducer' 
const rootReducer = combineReducers({
	LoginRed: SignIn,
	SignUpRed: registration,
	checkUserRed:checkUserTokenPwd,
	updatePasswordReducer:updatePassword,
	saveQuizReducer : save,
	getUserQuizReducer : getUserQuiz
});

export default rootReducer;
