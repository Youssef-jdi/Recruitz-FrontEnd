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

import * as widgets from 'surveyjs-widgets';
import Modal from 'react-responsive-modal';
import { Button, Card, CardBody, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Col } from 'reactstrap';
import customStyles from './custom-styling.css';
import { register } from '../../_actions';

// SurveyJSCreator.StylesManager.applyTheme("bootstrap");
var defaultThemeColorsEditor = SurveyJSCreator.StylesManager.ThemeColors["default"];
defaultThemeColorsEditor["$primary-color"] = "#20a8d8";
defaultThemeColorsEditor["$secondary-color"] = "#20a8d8";
defaultThemeColorsEditor["$primary-hover-color"] = "#20a8d8";
defaultThemeColorsEditor["$primary-text-color"] = "#20a8d8";
defaultThemeColorsEditor["$selection-border-color"] = "#20a8d8";
SurveyJSCreator.StylesManager.applyTheme("bootstrap");


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

// const customOverlay = {
// 	background: "rgba(36, 123, 160, 0.7)"
// }

// const customModal = {
// 	background: "#b2dbbf",
//     maxWidth: "500px",
//     width: "100%"
// }

class SurveyCreator extends Component {
	surveyCreator;
	constructor(props) {
		super(props);
		this.state = {
			user: {},
			open: false,
			candidate: { email: '', name: '', role: 'Candidate', password: '********' ,  },
			quiz : {}
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(event) {
		const { name, value } = event.target;
		const { candidate } = this.state;
		this.setState({
			candidate: {
				...candidate,
				[name]: value
			}
		});
	}
	handleSubmit(event) {
		event.preventDefault();
		const { candidate } = this.state;
		if (candidate.email && candidate.name) {
			candidate.quiz = this.props.quiz
			console.log('candidate ', candidate);
			this.props.register(candidate);
			
		}
	}

	onOpenModal = () => {
		this.setState({ open: true });
	};

	onCloseModal = () => {
		this.setState({ open: false });
	};

	componentDidMount() {
		let options = {
			showEmbededSurveyTab: false,
			showJSONEditorTab: false,
			showTranslationTab: true,
			showDefaultLanguageInTestSurveyTab: false,
			showInvisibleElementsInTestSurveyTab: false,
			designerHeight: "700px"
		};
		this.surveyCreator = new SurveyJSCreator.SurveyCreator('surveyCreatorContainer', options);
		this.surveyCreator.saveSurveyFunc = this.saveMySurvey;
		this.getConnectedUser();
	}

	getConnectedUser = () => {
		Auth.getUser() ? this.setState({ user: Auth.getUser() }) : console.log('no user connected');
	};

	render() {
		const { open } = this.state;
		const { candidate } = this.state;
		return (
			<div>
				<div id="surveyCreatorContainer" />
				<Col md="9" lg="7" xl="6">
					<Modal
						open={open}
						onClose={this.onCloseModal}
						center
						animationDuration={1000}
						classNames={{
							overlay: customStyles.customOverlay,
							modal: customStyles.customModal
						}}
					>
						<Card className="mx-4">
							<CardBody className="p-4">
								<Form onSubmit={this.handleSubmit}>
									<h1>Share with Candidate</h1>

									<p className="text-muted">Share with Candidate</p>
									<InputGroup className="mb-3">
										<InputGroupAddon addonType="prepend">
											<InputGroupText>
												<i className="icon-user" />
											</InputGroupText>
										</InputGroupAddon>

										<Input
											name="name"
											placeholder="Name"
											//  errorText={errors.name}
											onChange={this.handleChange}
											value={candidate.name}
										/>
									</InputGroup>
									<InputGroup className="mb-3">
										<InputGroupAddon addonType="prepend">
											<InputGroupText>@</InputGroupText>
										</InputGroupAddon>

										<Input
											name="email"
											placeholder="Email"
											// errorText={errors.email}
											onChange={this.handleChange}
											value={candidate.email}
										/>
									</InputGroup>
									{this.props.loading ? (
										<p>Loading ....</p>
									) : (
										<Button color="success" type="submit" block>
											Invite
										</Button>
									)}
									<p style={{ color: this.props.messageColor }}>{this.props.message.message}</p>
									<Button color="danger" block onClick={this.onCloseModal}>
										Later
									</Button>
								</Form>
							</CardBody>
						</Card>
					</Modal>
				</Col>
			</div>
		);
	}

	saveMySurvey = () => {
		this.onOpenModal();
		console.log(this.surveyCreator.text)
		this.props.save(JSON.parse(this.surveyCreator.text), this.state.user);
	};
}

const mapDispatchToProps = {
	save,
	register
};

const mapStateToProps = (state) => ({
	success: state.saveQuizReducer.success,
	loading: state.SignUpRed.loading,
	message: state.SignUpRed.message,
	messageColor: state.SignUpRed.messageColor,
	quiz : state.saveQuizReducer.quiz
});

export default connect(mapStateToProps, mapDispatchToProps)(SurveyCreator);
