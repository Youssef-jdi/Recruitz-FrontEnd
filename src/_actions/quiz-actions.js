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
			dispatch(getAllQuizesSuccess(res.data))
			console.log('response getting quizes ',res)
		})
		.catch(err => {
			dispatch(getAllQuizesFailure(err.data))
			console.log('err getting quizes ',err)
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
