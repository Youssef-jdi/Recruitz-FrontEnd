import React, { Component } from 'react';
import * as Survey from 'survey-react';
import { getQuizToPass } from '../../_actions';
import { finishQuiz } from '../../_actions';
import { connect } from 'react-redux';
import Auth from '../../_utils/Auth';
import { Redirect } from 'react-router-dom';

class QuizPass extends Component {
	loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;
	componentDidMount() {
		console.log('user s ',Auth.getUser())
        this.props.getQuizToPass(Auth.getUser());
        
    }
    
	render() {
		
        console.error(this.props.quiz);
        console.error('success getting quiz ',this.props.success);
        console.error('success finish quiz ',this.props.successFinish);
		let model = new Survey.Model(this.props.quiz);
		return (
			<div>
				{!this.props.successFinish ? !this.props.success ? (
					<div className="animated fadeIn pt-1 text-center">Loading...</div>
				) : (
					<Survey.Survey model={model} onComplete={this.onComplete} onValueChanged={this.onValueChanged} />
				) : (
					<Redirect to="/" />
				)}
			</div>
		);
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
	successFinish: state.finishQuizReducer.success
});

const mapDispatchToProps = {
	getQuizToPass,
	finishQuiz
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizPass);
