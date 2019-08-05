import React from 'react';
import { Button, Badge } from 'reactstrap';
import Moment from 'react-moment';


const RowAllQuizes = (props) => {
	const quiz = props.quiz;
	const candidate = props.candidate;
	console.log('success ',props.success)
	let date = new Date(quiz.date);
	return (
		<tr>
			<td>{quiz.title}</td>
			<td>{quiz.date ? <Moment format="D MMM YYYY">{date}</Moment> : 'not specified'}</td>
			<td>{quiz.madeBy.name}</td>
			<td>
				<Button onClick={() => props.assign(quiz,candidate)}>
					<i className="cui-share icons font-l d-block mt-1" />
				</Button>
				{/* {props.success ? <Button style={{marginLeft:'20%'}} color="success" disabled><i className="cui-circle-check icons font-l d-block mt-1" /></Button> : <> </>} */}
			</td>
		</tr>
	);
};



export default RowAllQuizes
