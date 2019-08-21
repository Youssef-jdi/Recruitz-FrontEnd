import React, { Component } from 'react';
import * as Survey from 'survey-react';
import { finishQuiz, getQuizToPass, isQuizPassed, startQuiz, checkStarted, reloadPage } from '../../_actions';
import { connect } from 'react-redux';
import Auth from '../../_utils/Auth';

// var defaultThemeColorsEditor = Survey.StylesManager.ThemeColors['default'];
// defaultThemeColorsEditor['$primary-color'] = '#20a8d8';
// defaultThemeColorsEditor['$secondary-color'] = '#20a8d8';
// defaultThemeColorsEditor['$primary-hover-color'] = '#20a8d8';
// defaultThemeColorsEditor['$primary-text-color'] = '#20a8d8';
// defaultThemeColorsEditor['$selection-border-color'] = '#20a8d8';
// Survey.StylesManager.applyTheme('bootstrap');
// Survey.defaultBootstrapCss.navigationButton = "btn btn-blue";
// Survey.StylesManager.applyTheme('bootstrap');
// Survey.defaultBootstrapCss.navigationButton = 'btn btn-green';
Survey.defaultBootstrapCss.navigationButton = "btn btn-primary";
Survey.Survey.cssType = "bootstrap";
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
		let model = new Survey.Model(this.props.quiz);
		console.error('model from server ', model);
		let data;
		var prevData = window.localStorage.getItem('survey'); //|| null;

		if (prevData) {
			data = JSON.parse(prevData);
			model.data = data;
			if (data.pageNo) {
				model.currentPageNo = data.pageNo + 1;
			}
			if (data.QuizTimeSpent) {
				model.timeSpent = data.QuizTimeSpent + 1;
			}
			console.log('current page ', model.currentPage);
			// if(data.PageTimeSpent){
			// 	model.currentPage.timeSpent = data.PageTimeSpent
			// }
		}
		return (
			<Survey.Survey
				model={model}
				onComplete={this.onComplete}
				onValueChanged={this.onValueChanged}
				onPartialSend={this.onPartialSend}
			/>
		);
	}

	onValueChanged = (result) => {
		console.log('value changed!');
	};

	onPartialSend = (survey) => {
		//console.error('time spent ', survey);
		this.saveSurveyData(survey);
	};

	onComplete = (result) => {
		//console.log('Complete! ', result.data);
		this.props.finishQuiz(Auth.getUser(), result.data);
	};

	saveSurveyData = (survey) => {
		// console.error('time spent in survey', survey.timeSpent);
		// console.error(' timeSpent in page', survey.currentPage.timeSpent);
		// console.error('saved survey ', survey);
		let data = survey.data;
		data.pageNo = survey.currentPageNo;
		data.QuizTimeSpent = survey.timeSpent;
		data.PageTimeSpent = survey.currentPage.timeSpent;
		window.localStorage.setItem('survey', JSON.stringify(data));
	};
}

const mapStateToProps = (state) => ({
	success: state.passQuizReducer.success,
	quiz: state.passQuizReducer.quiz,
	successFinish: state.finishQuizReducer.success,
	isPassed: state.isPassedReducer.isPassed,
	started: state.checkStartedReducer.started,
	user: state.isPassedReducer.user
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
