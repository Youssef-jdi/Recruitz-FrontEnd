import React, { Component } from 'react';
import { Col, Form, Container,FormGroup,Label,Input,Button,Row } from 'reactstrap';
import { checkUserTokenUpdatePassword , updatePassword} from '../../_actions';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom'

class UpdatePassword extends Component {
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);  
    }

    componentDidMount(){
        console.log(this.props.match.params.token)
        this.props.checkUserTokenUpdatePassword(this.props.match.params.token)
    }


    handleSubmit = (event) => {
        event.preventDefault();
        const  user  = this.props.user;
        if ( user.email  && user.password) {
            this.props.updatePassword(user)
        }
       
    }
    handleChange(event) {
        const { name, value } = event.target
        this.props.user.password = value
    }

   

    renderRedirect = () => {
        
        if (this.props.successUpdate) {
          return <Redirect to='/' />
        }
      }

	render() {
        console.error('successUpdate ',this.props.successUpdate)
		return (
            !this.props.success? <Redirect to="/problem"/> :
            <Row className="justify-content-center">
                {this.renderRedirect()}
            <div className="app flex-row align-items-center" style={{width : '30%'}} >
			<Container>
				<h2>Reset Password</h2>
				<Form className="form" onSubmit={this.handleSubmit}>
					<Col>
						<FormGroup>
							<Label>Email</Label>
							<Input readOnly disabled type="email" name="email" id="exampleEmail" placeholder={this.props.user ? this.props.user.email : "myemail@email.com"} />
						</FormGroup>
					</Col>
					<Col>
						<FormGroup>
							<Label for="examplePassword">Password</Label>
							<Input type="password" name="password" id="examplePassword" placeholder="********" onChange={this.handleChange} />
						</FormGroup>
					</Col>
					<Button color="success" type="submit" block>Submit</Button>
				</Form>
			</Container>
            </div>
            </Row>
		);
	}
}

const mapStateToProps = (state) => ({
    success: state.checkUserRed.success,
    user : state.checkUserRed.user,
    successUpdate: state.updatePasswordReducer.successUpdate,
    newUser: state.updatePasswordReducer.user,
    
});

const mapDispatchToProps = {
    checkUserTokenUpdatePassword,
    updatePassword,
    
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePassword);
