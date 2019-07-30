import React from 'react';
import { register } from '../../_actions';
import { connect } from 'react-redux';
import {
	Button,
	Card,
	CardBody,
	Col,
	Container,
	Form,
	Input,
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	Row
} from 'reactstrap';

class Register extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {
				name: '',
				email: '',
				role: 'Admin',
				password: '00000000'
			},
			submitted: false
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
	//&& user.password
	handleSubmit(event) {
		event.preventDefault();
		this.setState({ submitted: true });
		const { user } = this.state;
		if (user.name && user.email && user.role) {
			this.props.register(user);
		}
	}

	render() {
		const { user } = this.state;
		return (
			<div style={{ marginTop: '10%' }} className="animated fadeIn">
				<Container>
					<Row className="justify-content-center">
						<Col md="9" lg="7" xl="6">
							<Card className="mx-4">
								<CardBody className="p-4">
									<Form onSubmit={this.handleSubmit}>
										<h1>Register</h1>
										<p className="text-muted">Create your account</p>
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
												value={user.name}
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
												value={user.email}
											/>
										</InputGroup>
										<p style={{ color: this.props.messageColor }}>{this.props.message.errors}</p>

										<InputGroup className="mb-4">
											<InputGroupAddon addonType="prepend">
												<InputGroupText>
													<i className="icon-user" />
												</InputGroupText>
											</InputGroupAddon>
											<Input
												type="select"
												name="role"
												placeholder="role"
												onChange={this.handleChange}
												value={user.role}
												defaultValue="Admin"
											>
												<option defaultChecked value="Admin">
													Admin
												</option>
												<option value="Candidate">Candidate</option>
											</Input>
										</InputGroup>
										{this.props.loading ? (
											<p>Loading ....</p>
										) : (
											<Button color="success" type="submit" block>
												Create Account
											</Button>
										)}
										<p style={{ color: this.props.messageColor }}>{this.props.message.message}</p>
									</Form>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	loading: state.SignUpRed.loading,
	message: state.SignUpRed.message,
	messageColor: state.SignUpRed.messageColor
});

const mapDispatchToProps = {
	register
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
