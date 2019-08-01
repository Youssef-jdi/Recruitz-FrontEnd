import { combineReducers } from 'redux';
import { SignIn } from './login-reducer';
import { registration } from './register-reducer';
import { checkUserTokenPwd } from './checkTokenPwd-reducer';
import { updatePassword } from './updatePassword-reducer';
import { save } from './saveQuiz-reducer';
import { getUserQuiz } from './getUserQuiz-reducer';
import { passQuiz } from './passQuiz-reducer';
import { finishQuiz } from './finishQuiz-reducer';
import { getAllCandidates } from './getCandidates-reducer';
const rootReducer = combineReducers({
	LoginRed: SignIn,
	SignUpRed: registration,
	checkUserRed: checkUserTokenPwd,
	updatePasswordReducer: updatePassword,
	saveQuizReducer: save,
	getUserQuizReducer: getUserQuiz,
	passQuizReducer: passQuiz,
	finishQuizReducer : finishQuiz,
	getAllCandidatesReducer : getAllCandidates
});

export default rootReducer;
