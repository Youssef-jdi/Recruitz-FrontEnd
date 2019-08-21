import React, { Component } from 'react';
import {
	Badge,
	Card,
	CardBody,
	CardHeader,
	Col,
	Pagination,
	PaginationItem,
	PaginationLink,
	Row,
	Table,
	Input,
	InputGroup,
	InputGroupAddon,
	InputGroupText
} from 'reactstrap';

import { getUserQuiz } from '../../_actions';
import { deleteQuiz } from '../../_actions';
import { connect } from 'react-redux';
import Auth from '../../_utils/Auth';
import ListQuizRow from './ListQuizRow';

class ListQuiz extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: ''
		};
	}
	componentDidMount() {
		Auth.getUser() ? this.getQuizes() : this.props.history.push('/');
	}

	getQuizes = () => {
		const user = Auth.getUser();
		console.log('user from Auth ', user);
		this.props.getUserQuiz(user);
	};

	Search = (e) => {
		this.setState({ search: e.target.value });
	};

	render() {
		let idDeleted = this.props.deletedQuiz;
		console.error('successDeleting ',this.props.successDeleting)
		let filtredList = this.props.quizes.filter((quiz) => {
			return quiz.title.indexOf(this.state.search) !== -1;
		});

		if (idDeleted != 0) filtredList = filtredList.filter((quiz) => quiz._id != idDeleted);

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
											<th>Date registered</th>
											<th style={{textAlign : 'center'}}>Delete</th>
										</tr>
									</thead>
									<tbody>
										{filtredList.map((quiz) => {
											return (
												<ListQuizRow
													quiz={quiz}
													key={quiz._id}
													index={quiz._id}
													search={this.state.search}
													delete={this.props.deleteQuiz}
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
	success: state.getUserQuizReducer.success,
	quizes: state.getUserQuizReducer.quizes,
	successDeleting: state.deleteQuizReducer.success,
	deletedQuiz: state.deleteQuizReducer.id
});

const mapDispatchToProps = {
	getUserQuiz,
	deleteQuiz
};

export default connect(mapStateToProps, mapDispatchToProps)(ListQuiz);
