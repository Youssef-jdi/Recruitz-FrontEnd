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
	console.log('user id ', user.id )
	return(dispatch) => {
		dispatch(getAllQuizesPending())
		Axios
		.get(server+'/quiz/MyQuizes/'+user.id)
		.then(res => {
			res.data.quizes.forEach(element => {
				typeof	element.title === "undefined" ? element.title = "untitled" : element.title = element.title 
			});
			dispatch(getAllQuizesSuccess(res.data))
			console.log('response getting quizes ',res)
		})
		.catch(err => {
			dispatch(getAllQuizesFailure(err.data))
			console.log('err getting quizes ',err)
		})
	}
}


export const getQuizToPass = (user) => {
	return (dispatch) => {
		console.log('user from Auth ',user)
		dispatch(getQuizToPassPending())
		Axios
		.get(server+'/quiz/pass/'+user.id)
		.then(res => {
			dispatch(getQuizToPassSuccess(res.data))
		})
		.catch(err => {
			dispatch(getQuizToPassFailure(err.data))
		})
	}
}


export const finishQuiz = (user,result) => {
	return(dispatch) => {
		dispatch(finishQuizPending())
		Axios
		.post(server+'/quiz/finishQuiz',{user,result})
		.then(res => {
			dispatch(finishQuizSuccess(res.data))
		})
		.catch(err => {
			dispatch(finishQuizFailure(err.data))
		})
	}
}




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
