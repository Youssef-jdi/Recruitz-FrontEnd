import React from 'react';
import { Button } from 'reactstrap';
import Moment from 'react-moment';
const ListQuizRow = (props) => {
	const quiz = props.quiz;
	let date = new Date(quiz.date);

	return (
		<tr>
			<td>{quiz.title}</td>
			<td>{quiz.date ? <Moment format="D MMM YYYY">{date}</Moment> : 'not specified'}</td>
			<td>
				<Button>View</Button>
				<Button style={{marginLeft: '20%'}} onClick={() => props.delete(quiz)}>
					<i className="cui-trash icons font-xl d-block mt-1" />
				</Button>
			</td>
		</tr>
	);
};


export default ListQuizRow;
