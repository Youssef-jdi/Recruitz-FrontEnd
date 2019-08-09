import { userConstants } from '../_constants';
import server from '../_utils/server';
import Auth from '../_utils/Auth';
import { Axios } from '../_utils/Axios';
import { async } from 'q';

export const register = (user) => {
	return (dispatch) => {
		dispatch(registrationPending());
		Axios.post(server + '/auth/signup', user)
			.then((response) => {
				console.log(response);
				dispatch(registrationSuccess(response.data.message));
			})
			.catch((err) => {
				console.log(err.response.data);
				dispatch(registrationFailure(err.response.data));
			});
	};
};

export const login = (user) => {
	return (dispatch) => {
		console.log('user login ', user);
		dispatch(loginPending());
		Axios.post(server + '/user/login', user)
			.then((res) => {
				console.log('user from ws ', res.data.user);
				Auth.authenticateUser(res.data.token, res.data.user);
				dispatch(loginSuccess(res.data));
			})
			.catch((err) => {
				dispatch(loginFailure(err.response.data));
			});
	};
};

export const checkUserTokenUpdatePassword = (token) => {
	console.log('token ' + token);
	return (dispatch) => {
		dispatch(checkUserTokenUpdatePasswordPending());
		Axios.post(server + '/user/reset/', { token })
			.then((res) => {
				dispatch(checkUserTokenUpdatePasswordSuccess(res.data));
			})
			.catch((err) => {
				console.log('false ', err);
				dispatch(checkUserTokenUpdatePasswordFailure(err));
			});
	};
};

export const updatePassword = (user) => {
	return (dispatch) => {
		dispatch(UpdatePasswordPending());
		Axios.post(server + '/user/firstlogin', { user })
			.then((res) => {
				console.log(res.data);
				dispatch(UpdatePasswordSuccess(res.data));
			})
			.catch((err) => {
				dispatch(UpdatePasswordFailure(err.data));
			});
	};
};

export const getCandidates = () => {
	return (dispatch) => {
		dispatch(GetCandidatesPending());
		Axios.get(server + '/user/Candidates')
			.then((res) => {
				dispatch(GetCandidatesSuccess(res.data));
			})
			.catch((err) => {
				dispatch(GetCandidatesFailure(err.data));
			});
	};
};



export const isQuizPassed = (user) => {
	return(dispatch) => {
		dispatch(isQuizPassedPending())
		console.log('user ',user)
		Axios
		.get(server+'/user/isQuizPassed/'+user.id)
		.then(res => {
			
			dispatch(isQuizPassedSuccess(res.data))
		})
		.catch(err => {
			console.error('erreur ',err)
			dispatch(isQuizPassedFailure(err.response.data))
		})
	}
}

export const startQuiz = (user) => {
	return(dispatch) => {
		dispatch(startQuizPending())
		Axios
		.post(server+'/user/startQuiz' , user)
		.then(res => {
			dispatch(startQuizSuccess(res.data))
		})
		.catch(err => {
			dispatch(startQuizFailure(err.response.data))
		})
	}
}

export const reloadPage = (user) => {
	return(dispatch) => {
		dispatch(reloadPagePending())
		Axios
		.post(server+'/user/reload',user)
		.then(res => {
			dispatch(reloadPageSuccess(res.data))
		})
		.catch(err => {
			dispatch(reloadPageFailure(err.response.data))
		})
	}
}

/*actions creators */

const registrationPending = () => ({
	type: userConstants.REGISTER_REQUEST
});

const registrationSuccess = (data) => ({
	type: userConstants.REGISTER_SUCCESS,
	payload: data
});

const registrationFailure = (data) => ({
	type: userConstants.REGISTER_FAILURE,
	error: data
});

const loginPending = () => ({
	type: userConstants.LOGIN_REQUEST
});
const loginSuccess = (data) => ({
	type: userConstants.LOGIN_SUCCESS,
	payload: data
});
const loginFailure = (data) => ({
	type: userConstants.LOGIN_FAILURE,
	error: data
});

const checkUserTokenUpdatePasswordPending = () => ({
	type: userConstants.UPDATE_PASSWORD_REQUEST
});
const checkUserTokenUpdatePasswordSuccess = (data) => ({
	type: userConstants.UPDATE_PASSWORD_SUCCESS,
	payload: data
});
const checkUserTokenUpdatePasswordFailure = (data) => ({
	type: userConstants.UPDATE_PASSWORD_FAILURE,
	error: data
});

const UpdatePasswordPending = () => ({
	type: userConstants.UPDATE_REQUEST
});
const UpdatePasswordSuccess = (data) => ({
	type: userConstants.UPDATE_SUCCESS,
	payload: data
});
const UpdatePasswordFailure = (data) => ({
	type: userConstants.UPDATE_FAILURE,
	error: data
});

const GetCandidatesPending = () => ({
	type: userConstants.GET_CANDIDATES_PENDING
});
const GetCandidatesSuccess = (data) => ({
	type: userConstants.GET_CANDIDATES_SUCCESS,
	payload: data
});
const GetCandidatesFailure = (data) => ({
	type: userConstants.GET_CANDIDATES_FAILURE,
	error: data
});

const isQuizPassedPending = () => ({
	type: userConstants.ISQUIZ_PASSED_PENDING
});
const isQuizPassedSuccess = (data) => ({
	type: userConstants.ISQUIZ_PASSED_SUCCESS,
	payload: data
});
const isQuizPassedFailure = (data) => ({
	type: userConstants.ISQUIZ_PASSED_FAILURE,
	error: data
});


const startQuizPending = () => ({
	type: userConstants.START_QUIZ_PENDING
});
const startQuizSuccess = (data) => ({
	type: userConstants.START_QUIZ_SUCCESS,
	payload: data
});
const startQuizFailure = (data) => ({
	type: userConstants.START_QUIZ_FAILURE,
	error: data
});

const reloadPagePending = () => ({
	type: userConstants.RELOAD_PAGE_PENDING
});
const reloadPageSuccess = (data) => ({
	type: userConstants.RELOAD_PAGE_SUCCESS,
	payload: data
});
const reloadPageFailure = (data) => ({
	type: userConstants.RELOAD_PAGE_FAILURE,
	error: data
});

