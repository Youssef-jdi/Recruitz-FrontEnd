import React, { Component } from 'react';
import * as Survey from 'survey-react';
import { finishQuiz, getQuizToPass, isQuizPassed, startQuiz, checkStarted, reloadPage } from '../../_actions';
import { connect } from 'react-redux';
import Auth from '../../_utils/Auth';

class QuizPass extends Component {
	constructor(props) {
		super(props);
	}
	loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;
	componentDidMount() {
		Auth.getUser() ? this.props.isQuizPassed(Auth.getUser()) : console.log('');
		Auth.getUser() ? this.props.getQuizToPass(Auth.getUser()) : console.log('');
		Auth.getUser() ? this.props.checkStarted(Auth.getUser()) : console.log('');
		if (window.performance) {
			if (performance.navigation.type == 1) {
				//alert('This page is  reloaded');
				Auth.getUser() ? this.props.reloadPage(Auth.getUser()) : console.log('');
			} else {
				//alert('This page is not reloaded');
			}
		}
	}

	render() {
		console.error('user ',this.props.user);
		let model = new Survey.Model(this.props.quiz);
		let render;
		if (this.props.isPassed) {
			render = <h1>You already passed the quiz </h1>;
		} else if (this.props.successFinish) {
			render = <h1>You finished</h1>;
		} else {
			if (this.props.success === 2) {
				render = <div className="animated fadeIn pt-1 text-center">Loading...</div>;
			} else if (this.props.success === 1) {
				if (this.props.started) {
					render = <h1>You started the </h1>;
					console.error('this user started the page')
				}
				// else if(this.props.user.reloadPage){
				// 	render = <h1>You reloaded the page </h1>;
				// 	console.error('this user reloaded the page')
				// }

				 else {
					this.props.startQuiz(Auth.getUser());
					render = (
						<Survey.Survey
							model={model}
							onComplete={this.onComplete}
							onValueChanged={this.onValueChanged}
						/>
					);
				}
			} else {
				render = <h1>You have no quiz</h1>;
			}
		}

		return <div>{render}</div>;
	}

	onValueChanged = (result) => {
		console.log('value changed!');
	};

	onComplete = (result) => {
		console.log('Complete! ', result.data);
		this.props.finishQuiz(Auth.getUser(), result.data);
	};
}

const mapStateToProps = (state) => ({
	success: state.passQuizReducer.success,
	quiz: state.passQuizReducer.quiz,
	successFinish: state.finishQuizReducer.success,
	isPassed: state.isPassedReducer.isPassed,
	started: state.checkStartedReducer.started,
	user : state.isPassedReducer.user
});

const mapDispatchToProps = {
	getQuizToPass,
	finishQuiz,
	isQuizPassed,
	startQuiz,
	checkStarted,
	reloadPage
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizPass);
