import React from 'react';
import { Badge } from 'reactstrap';

const ListQuizRow = (props) => {
	const quiz = props.quiz;
	let date = new Date(quiz.date);
	console.log('date object', date);
	// console.log('date ',quiz.date)
	let dd = date.getDate();
	let mm = date.getMonth() + 1;
	let yyyy = date.getFullYear();
	dd < 10 ? (dd = '0' + dd) : (dd = dd);
	mm < 10 ? (mm = '0' + mm) : (mm = mm);
	quiz.date = dd + '/' + mm + '/' + yyyy;

	return (
		<tr>
			<td>{quiz.title ? quiz.title : 'untitled'}</td>
			<td>{quiz.date ? quiz.date : 'not specified'}</td>
			<td>TODO</td>
			<td>
				<Badge style={{ float: 'left', marginTop: '4px' }} color="danger">
					Delete
				</Badge>
				<Badge  style={{ float: 'right', marginTop: '4px' }} color="warning">
				 <a onClick={sendInvite}>Active</a>	
				</Badge>
			</td>
		</tr>
	);
};


const sendInvite = () => {
	console.log('i am clicked')
}

export default ListQuizRow;
