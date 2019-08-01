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
import { getCandidates } from '../../_actions';
import { connect } from 'react-redux';
import RowCandidate from './RowCandidate';
class Candidates extends Component {
	constructor(props){
		super(props)
		this.state = {
			search : ''
		}
	}
	componentDidMount(){
		this.props.getCandidates()
	}
	Search = (e) => {
		this.setState({ search: e.target.value });
	};
	render() {
		let filtredList = this.props.candidates.filter((candidate) =>{
			return candidate.name.indexOf(this.state.search) !== -1
		})
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
									<Input type="search" placeholder="Search by name" onChange={this.Search} />
								</InputGroup>
								<div style={{ height: '0px' , position : 'absolute' }} />
								<Table bordered striped responsive size="sm">
									{/* hover */}
									<thead>
										<tr>
											<th>Name</th>
											<th>Email</th>
											<th>Status</th>
											<th>Assign</th>
										</tr>
									</thead>
									<tbody>
										{/** Row */}
										{/* {this.tabRow()} */}
										{filtredList.map((candidate) => {
											return (
												<RowCandidate candidate={candidate} key={candidate._id} search={this.state.search} />
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
	success: state.getAllCandidatesReducer.success,
	candidates: state.getAllCandidatesReducer.candidates
});

const mapDispatchToProps = {
	getCandidates
};

export default connect(mapStateToProps, mapDispatchToProps)(Candidates);
