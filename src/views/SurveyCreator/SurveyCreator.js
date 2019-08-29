import React, { Component } from 'react';
import * as SurveyJSCreator from 'survey-creator';
import * as SurveyKo from 'survey-knockout';
import 'survey-creator/survey-creator.css';

import 'jquery-ui/themes/base/all.css';
import 'nouislider/distribute/nouislider.css';
import 'select2/dist/css/select2.css';
import 'bootstrap-slider/dist/css/bootstrap-slider.css';

import 'jquery-bar-rating/dist/themes/css-stars.css';
import 'jquery-bar-rating/dist/themes/fontawesome-stars.css';

import $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker.js';
import 'select2/dist/js/select2.js';
import 'jquery-bar-rating';

import 'icheck/skins/square/blue.css';
import { save } from '../../_actions';
import { connect } from 'react-redux';
import Auth from '../../_utils/Auth';
import {Redirect} from 'react-router-dom'
import * as widgets from 'surveyjs-widgets';
import customStyles from './custom-styling.css';

// SurveyJSCreator.StylesManager.applyTheme("bootstrap");
var defaultThemeColorsEditor = SurveyJSCreator.StylesManager.ThemeColors['default'];
defaultThemeColorsEditor['$primary-color'] = '#20a8d8';
defaultThemeColorsEditor['$secondary-color'] = '#20a8d8';
defaultThemeColorsEditor['$primary-hover-color'] = '#20a8d8';
defaultThemeColorsEditor['$primary-text-color'] = '#20a8d8';
defaultThemeColorsEditor['$selection-border-color'] = '#20a8d8';
SurveyJSCreator.StylesManager.applyTheme('bootstrap');

widgets.icheck(SurveyKo, $);
widgets.select2(SurveyKo, $);
widgets.inputmask(SurveyKo);
widgets.jquerybarrating(SurveyKo, $);
widgets.jqueryuidatepicker(SurveyKo, $);
widgets.nouislider(SurveyKo);
widgets.select2tagbox(SurveyKo, $);
widgets.signaturepad(SurveyKo);
widgets.sortablejs(SurveyKo);
widgets.ckeditor(SurveyKo);
widgets.autocomplete(SurveyKo, $);
widgets.bootstrapslider(SurveyKo);


class SurveyCreator extends Component {
	surveyCreator;
	constructor(props) {
		super(props);
		this.state = {
			user: {},
			open: false,
			quiz: {},
			saved : false 
		};
	}

	componentDidMount() {
		let options = {
			showEmbededSurveyTab: false,
			showJSONEditorTab: false,
			showTranslationTab: true,
			showDefaultLanguageInTestSurveyTab: false,
			showInvisibleElementsInTestSurveyTab: false,
			designerHeight: '700px'
		};
		this.surveyCreator = new SurveyJSCreator.SurveyCreator('surveyCreatorContainer', options);
		this.surveyCreator.saveSurveyFunc = this.saveMySurvey;
		this.getConnectedUser();
		console.log('success ',this.props.success)
	}

	getConnectedUser = () => {
		Auth.getUser() ? this.setState({ user: Auth.getUser() }) : console.log('no user connected');
	};

	render() {
		let render ;
		
		this.props.success && this.state.saved ? render = <Redirect to="/dashboard/Quiz/listQuizes"/> : render = <div id="surveyCreatorContainer" />
		
		return render;
	}

	saveMySurvey = () => {
		console.log(this.surveyCreator.text);
		this.props.save(JSON.parse(this.surveyCreator.text), this.state.user);
		this.setState({saved : true})
		// this.props.success ? this.props.history.push('/Dashboard/Candidates') : console.log('s')
	};
}

const mapDispatchToProps = {
	save
};

const mapStateToProps = (state) => ({
	success: state.saveQuizReducer.success,
	quiz: state.saveQuizReducer.quiz
});

export default connect(mapStateToProps, mapDispatchToProps)(SurveyCreator);
