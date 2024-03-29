import server from '../_utils/server';
import { Axios } from '../_utils/Axios';
import { quizConstants } from '../_constants';

export const save = (quiz, user) => {
	return (dispatch) => {
		dispatch(savePending());
		Axios.post(server + '/quiz/create', { quiz, user })
			.then((res) => {
				console.log('res saving quiz ', res);
				dispatch(saveSuccess(res.data));
			})
			.catch((err) => {
				console.log('err saving quiz ', err);
				dispatch(saveFailure(err.data));
			});
	};
};

export const getUserQuiz = (user) => {
	console.log('user id ', user.id);
	return (dispatch) => {
		dispatch(getAllQuizesPending());
		Axios.get(server + '/quiz/MyQuizes/' + user.id)
			.then((res) => {
				res.data.quizes.forEach((element) => {
					typeof element.title === 'undefined'
						? (element.title = 'untitled')
						: (element.title = element.title);
				});
				dispatch(getAllQuizesSuccess(res.data));
				console.log('response getting quizes ', res);
			})
			.catch((err) => {
				dispatch(getAllQuizesFailure(err.data));
				console.log('err getting quizes ', err);
			});
	};
};

export const getQuizToPass = (user) => {
	return (dispatch) => {
		dispatch(getQuizToPassPending());
		Axios.get(server + '/quiz/pass/' + user.id)
			.then((res) => {
				console.log('quiz to pass', res.data);
				dispatch(getQuizToPassSuccess(res.data));
			})
			.catch((err) => {
				dispatch(getQuizToPassFailure(err.data));
			});
	};
};

export const finishQuiz = (user, result) => {
	return (dispatch) => {
		dispatch(finishQuizPending());
		Axios.post(server + '/quiz/finishQuiz', { user, result })
			.then((res) => {
				dispatch(finishQuizSuccess(res.data));
			})
			.catch((err) => {
				dispatch(finishQuizFailure(err.data));
			});
	};
};

export const getResult = (user) => {
	return (dispatch) => {
		dispatch(getResultPending());
		Axios.get(server + '/quiz/result/' + user)
			.then((res) => {
				console.log(res.data);
				dispatch(getResultSuccess(res.data));
			})
			.catch((err) => {
				console.log(err);
				dispatch(getResultFailure(err));
			});
	};
};
export const getAllQuizes = () => {
	return (dispatch) => {
		dispatch(getQuizesPending());
		Axios.get(server + '/quiz/AllQuizes')
			.then((res) => {
				res.data.quizes.forEach((element) => {
					typeof element.title === 'undefined'
						? (element.title = 'untitled')
						: (element.title = element.title);
				});
				
				dispatch(getQuizesSuccess(res.data));
			})
			.catch((err) => {
				dispatch(getQuizesFailure(err.data));
			});
	};
};

export const AssignQuizToUser = (quiz, user) => {
	return (dispatch) => {
		dispatch(AssignQuizToUserPending());
		
		Axios.post(server + '/quiz/assign', { user, quiz })
			.then((res) => {
				dispatch(AssignQuizToUserSuccess(res.data));
			})
			.catch((err) => {
				dispatch(AssignQuizToUserFailure(err));
			});
	};
};

export const deleteQuiz = (quiz) => {
	return (dispatch) => {
		dispatch(deleteQuizPending());
		//let quiz = getState().redu.quiz
		//let newquiz = quiz.filter((x)=>x.id !== quiz.id)
		Axios.post(server + '/quiz/delete', { quiz })
			.then((res) => {

				dispatch(deleteQuizSuccess(res.data));
				res.data.quizes.forEach((element) => {
					typeof element.title === 'undefined'
						? (element.title = 'untitled')
						: (element.title = element.title);
				});
				setTimeout(() => {
					dispatch(getAllQuizesSuccess(res.data))
				}, 1000);

			})
			.catch((err) => {
				dispatch(deleteQuizFailure(err));
			});
	};
};

export const checkStarted = (user) => {
	return (dispatch) => {
		dispatch(checkStartedPending());
		Axios.get(server + '/quiz/isStarted/' + user.id)
			.then((res) => {
				console.error(res.data);
				dispatch(checkStartedSuccess(res.data));
			})
			.catch((err) => {
				dispatch(checkStartedFailure(err.response.data));
			});
	};
};

const savePending = () => ({
	type: quizConstants.SAVE_REQUEST
});

const saveSuccess = (data) => ({
	type: quizConstants.SAVE_SUCCESS,
	payload: data
});

const saveFailure = (data) => ({
	type: quizConstants.SAVE_FAILURE,
	error: data
});

const getAllQuizesPending = () => ({
	type: quizConstants.USER_QUIZES_REQUEST
});

const getAllQuizesSuccess = (data) => ({
	type: quizConstants.USER_QUIZES_SUCCESS,
	payload: data
});

const getAllQuizesFailure = (data) => ({
	type: quizConstants.USER_QUIZES_FAILURE,
	error: data
});

const getQuizToPassPending = () => ({
	type: quizConstants.QUIZ_PASS_REQUEST
});

const getQuizToPassSuccess = (data) => ({
	type: quizConstants.QUIZ_PASS_SUCCESS,
	payload: data
});

const getQuizToPassFailure = (data) => ({
	type: quizConstants.QUIZ_PASS_FAILURE,
	error: data
});

const finishQuizPending = () => ({
	type: quizConstants.FINISH_QUIZ_REQUEST
});

const finishQuizSuccess = (data) => ({
	type: quizConstants.FINISH_QUIZ_SUCCESS,
	payload: data
});

const finishQuizFailure = (data) => ({
	type: quizConstants.FINISH_QUIZ_FAILURE,
	error: data
});

const getResultPending = () => ({
	type: quizConstants.GET_RESULT_REQUEST
});

const getResultSuccess = (data) => ({
	type: quizConstants.GET_RESULT_SUCCESS,
	payload: data
});

const getResultFailure = (data) => ({
	type: quizConstants.GET_RESULT_FAILURE,
	error: data
});

const getQuizesPending = () => ({
	type: quizConstants.GET_ALL_QUIZES_REQUEST
});

const getQuizesSuccess = (data) => ({
	type: quizConstants.GET_ALL_QUIZES_SUCCESS,
	payload: data
});

const getQuizesFailure = (data) => ({
	type: quizConstants.GET_ALL_QUIZES_FAILURE,
	error: data
});

const AssignQuizToUserPending = () => ({
	type: quizConstants.ASSIGN_QUIZTOUSER_REQUEST
});

const AssignQuizToUserSuccess = (data) => ({
	type: quizConstants.ASSIGN_QUIZTOUSER_SUCCESS,
	payload: data
});

const AssignQuizToUserFailure = (data) => ({
	type: quizConstants.ASSIGN_QUIZTOUSER_FAILURE,
	error: data
});

const deleteQuizPending = () => ({
	type: quizConstants.DELETE_QUIZ_REQUEST
});

const deleteQuizSuccess = (data, id) => ({
	type: quizConstants.DELETE_QUIZ_SUCCESS,
	payload: data,
	
});

const deleteQuizFailure = (data) => ({
	type: quizConstants.DELETE_QUIZ_FAILURE,
	error: data
});
const checkStartedPending = () => ({
	type: quizConstants.CHECK_STARTED_REQUEST
});

const checkStartedSuccess = (data) => ({
	type: quizConstants.CHECK_STARTED_SUCCESS,
	payload: data
});

const checkStartedFailure = (data) => ({
	type: quizConstants.CHECK_STARTED_FAILURE,
	error: data
});
