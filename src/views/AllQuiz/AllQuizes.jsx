import React, { Component } from 'react';
import {
	Card,
	CardBody,
	CardHeader,
	Col,
	Row,
	Table,
	Input,
	InputGroup,
	InputGroupAddon,
	InputGroupText
} from 'reactstrap';
import { getAllQuizes } from '../../_actions';
import { getUser } from '../../_actions';
import { connect } from 'react-redux';
import RowAllQuizes from './AllQuizesRow';
import { AssignQuizToUser } from '../../_actions';
class AllQuizes extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: ''
		};
	}
	componentDidMount() {
		this.props.getAllQuizes();
	}
	Search = (e) => {
		this.setState({ search: e.target.value });
	};
	render() {
		let filtredList = this.props.quizes.filter((quiz) => {
			return quiz.title.indexOf(this.state.search) !== -1;
		});
		return (
			<div className="animated fadeIn">
				<Row>
					<Col>
						<Card>
							<CardHeader>
								<i className="fa fa-align-justify" /> My Quizes
							</CardHeader>
							<CardBody>
								{/* <Row><Col><Input onChange={this.Search} placeholder="Search by title"></Input></Col></Row> */}
								<InputGroup className="mb-4">
									<InputGroupAddon addonType="prepend">
										<InputGroupText>
											<i className="cui-magnifying-glass icons font- d-block mt-1" />
										</InputGroupText>
									</InputGroupAddon>
									<Input type="search" placeholder="Search by title" onChange={this.Search} />
								</InputGroup>
								<div style={{ height: '0px', position: 'absolute' }} />
								<Table bordered striped responsive size="sm">
									{/* hover */}
									<thead>
										<tr>
											<th>Title</th>
											<th>Date</th>
											<th>Made by</th>
											<th>Select</th>
										</tr>
									</thead>
									<tbody>
										{/** Row */}
										{/* {this.tabRow()} */}
										{filtredList.map((quiz) => {
											//let user = this.props.getUser(quiz.madeBy)
											return (
												<RowAllQuizes
													quiz={quiz}
													key={quiz._id}
													search={this.state.search}
													history={this.props.history}
													candidate={this.props.location.state.candidate}
                                                    assign={this.props.AssignQuizToUser}
                                                    success={this.props.successAssign}
												/>
											);
										})}
									</tbody>
								</Table>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	success: state.getAllQuizesReducer.success,
	quizes: state.getAllQuizesReducer.quizes,
	successUser: state.getAdminReducer.success,
	user: state.getAdminReducer.user,
	successAssign: state.AssignQuizReducer.success
});

const mapDispatchToProps = {
	getAllQuizes,
	getUser,
	AssignQuizToUser
};

export default connect(mapStateToProps, mapDispatchToProps)(AllQuizes);
