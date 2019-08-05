import React, { Component } from 'react';
import {
	Button,
	Card,
	CardBody,
	CardGroup,
	Col,
	Container,
	Form,
	Input,
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	Row
} from 'reactstrap';
import { login } from '../../_actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
class Login extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			user: {
				email: '',
				password: ''
			}
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const { name, value } = event.target;
		const { user } = this.state;
		this.setState({
			user: {
				...user,
				[name]: value
			}
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		const { user } = this.state;
		if (user.email && user.password) {
			this.props.login(user);
		}
	}

	render() {
		
		if(this.props.success && this.props.user.role === 'Candidate'){
			//check if Candidate .resultQuiz is empty
			return <Redirect to="/dashboard/Quiz/QuizPass" />
			//return <div><h1>Hello world</h1></div>
		}
		else if (this.props.success && this.props.user.role !== 'Candidate'){
			console.log('Admin or Super Admin')
			return <Redirect to="/dashboard" />
		}
		else {
			return (
				<Row className="justify-content-center">
				<div className="app flex-row align-items-center">
					<Container>
						<Row className="justify-content-center">
							<Col md="8">
								<CardGroup>
									<Card className="p-4">
										<CardBody>
											<Form onSubmit={this.handleSubmit}>
												<h1>Login</h1>
												<p className="text-muted">Sign In to your account</p>
												<InputGroup className="mb-3">
													<InputGroupAddon addonType="prepend">
														<InputGroupText>
															<i className="icon-user" />
														</InputGroupText>
													</InputGroupAddon>
													<Input name="email" onChange={this.handleChange} />
												</InputGroup>
												<InputGroup className="mb-4">
													<InputGroupAddon addonType="prepend">
														<InputGroupText>
															<i className="icon-lock" />
														</InputGroupText>
													</InputGroupAddon>
													<Input
														type="password"
														name="password"
														onChange={this.handleChange}
													/>
												</InputGroup>
												<Row>
													<Col xs="6">
														{this.props.loading ? (
															<p>Loading ....</p>
														) : (
															<Button color="primary" className="px-4" type="submit">
																Login
															</Button>
														)}
														<p style={{ color: this.props.messageColor }}>
															{this.props.message}
														</p>
													</Col>
													<Col xs="6" className="text-right">
														<Button color="link" className="px-0">
															Forgot password?
														</Button>
													</Col>
												</Row>
											</Form>
										</CardBody>
									</Card>
									<Card
										className="text-white bg-primary py-5 d-md-down-none"
										style={{ width: '44%' }}
									>
										<CardBody className="text-center">
											<div>
												<h2>Quiz App</h2>
												<p>
													Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
													eiusmod tempor incididunt ut labore et dolore magna aliqua.
												</p>
											</div>
											<br />
										</CardBody>
									</Card>
								</CardGroup>
							</Col>
						</Row>
					</Container>
				</div>
			</Row>
			)
		}
	
		
		
	}
}

const mapDispatchToProps = {
	login
};

const mapStateToProps = (state) => ({
	loading: state.LoginRed.loading,
	message: state.LoginRed.message,
	messageColor: state.LoginRed.messageColor,
	success: state.LoginRed.success,
	user : state.LoginRed.user
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
