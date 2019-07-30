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
	Table
} from 'reactstrap';

import { getUserQuiz } from '../../_actions';
import { connect } from 'react-redux';
import Auth from '../../_utils/Auth';
import ListQuizRow from './ListQuizRow';

class ListQuiz extends Component {
	componentDidMount() {
		this.getQuizes();
		console.log('component did mount');
	}

	getQuizes = () => {
		const user = Auth.getUser();
		console.log('user from Auth ', user);
		this.props.getUserQuiz(user);
	};
	tabRow() {
		return this.props.quizes.map((quiz) => {
			return <ListQuizRow quiz={quiz} key={quiz._id} />;
		});
	}

	render() {
		this.props.success
			? this.props.quizes.forEach((element) => {
					console.log('element ', element);
				})
			: console.log('not working');
		return (
			<div className="animated fadeIn">
				<Row>
					<Col>
						<Card>
							<CardHeader>
								<i className="fa fa-align-justify" /> My Quizes
							</CardHeader>
							<CardBody>
								<Table  bordered striped responsive size="sm"> {/* hover */}
									<thead>
										<tr>
											<th>Title</th>
											<th>Date registered</th>
											<th>Role</th>
											<th>Status</th>
										</tr>
									</thead>
									<tbody>
										{/** Row */}
										{this.tabRow()}
									</tbody>
								</Table>
								<nav>
									<Pagination>
										<PaginationItem>
											<PaginationLink previous tag="button">
												Prev
											</PaginationLink>
										</PaginationItem>
										<PaginationItem active>
											<PaginationLink tag="button">1</PaginationLink>
										</PaginationItem>
										<PaginationItem>
											<PaginationLink tag="button">2</PaginationLink>
										</PaginationItem>
										<PaginationItem>
											<PaginationLink tag="button">3</PaginationLink>
										</PaginationItem>
										<PaginationItem>
											<PaginationLink tag="button">4</PaginationLink>
										</PaginationItem>
										<PaginationItem>
											<PaginationLink next tag="button">
												Next
											</PaginationLink>
										</PaginationItem>
									</Pagination>
								</nav>
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
	quizes: state.getUserQuizReducer.quizes
});

const mapDispatchToProps = {
	getUserQuiz
};

export default connect(mapStateToProps, mapDispatchToProps)(ListQuiz);
