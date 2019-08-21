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
				{/* <Button style={{marginLeft: '40%'}} onClick={() => props.delete(quiz,props.index)}> */}
					<i className="cui-trash icons font-xl d-block mt-1" style={{marginLeft : '43%' , cursor : 'pointer'}} onClick={() => props.delete(quiz,props.index)} />
				{/* </Button> */}
			</td>
		</tr>
	);
};


export default ListQuizRow;
