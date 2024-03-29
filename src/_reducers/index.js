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
import { getResult } from './getResult-reducer';
import { getAllQuizes } from './getAllQuizes-reducer';
import { getAdmin } from './getAdmin-reducer';
import { AssignQuiz } from './AssignQuiz-reducer';
import { deleteQuiz } from './deleteQuiz-reducer';
import { isPassed } from './isQuizPassed-reducer'
import { checkStarted } from './checkStarted-reducer'

const rootReducer = combineReducers({
	LoginRed: SignIn,
	SignUpRed: registration,
	checkUserRed: checkUserTokenPwd,
	updatePasswordReducer: updatePassword,
	saveQuizReducer: save,
	getUserQuizReducer: getUserQuiz,
	passQuizReducer: passQuiz,
	finishQuizReducer : finishQuiz,
	getAllCandidatesReducer : getAllCandidates,
	getResultReducer : getResult,
	getAllQuizesReducer : getAllQuizes,
	getAdminReducer : getAdmin,
	AssignQuizReducer : AssignQuiz,
	deleteQuizReducer : deleteQuiz,
	isPassedReducer : isPassed,
	checkStartedReducer : checkStarted
},
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default rootReducer;
