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
			</td>
		</tr>
	);
};

// const sendInvite = () => {
// 	console.log('i am clicked')
// }

export default ListQuizRow;
