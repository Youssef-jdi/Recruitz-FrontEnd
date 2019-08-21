import React from 'react';
import { Button, Badge } from 'reactstrap';
//see if candidate tried to cheat
const RowCandidate = (props) => {
	const candidate = props.candidate;
	const valueBadge = candidate.quizToPass ? (candidate.resultQuiz ? 'Passed' : 'In Progress') : 'Not Assigned';
	const colorBadge = candidate.quizToPass ? (candidate.resultQuiz ? 'success' : 'warning') : 'danger';
	const valueIcon = candidate.quizToPass
		? candidate.resultQuiz ? 'cui-graph icons font-l d-block mt-1' : 'cui-calculator icons font-l d-block mt-1'
		: 'cui-envelope-closed icons font-l d-block mt-1';
	let disabled;
	const valueButton = candidate.quizToPass ? (candidate.resultQuiz ? null : (disabled = true)) : null;
	const execButton = (e) => {
		candidate.quizToPass
			? candidate.resultQuiz
				? props.history.push({ pathname: '/dashboard/result', state: { candidate: candidate } })
				: e.preventDefault()
			: props.history.push({ pathname: '/dashboard/allquizes', state: { candidate: candidate } });
	};

	const TextButton = candidate.quizToPass
		? candidate.resultQuiz ? 'View Results' : 'Quiz in Progress'
		: 'Assign Quiz';
	const StyleButton = candidate.quizToPass
		? candidate.resultQuiz
			? null
			: {
				pointerEvents: 'none',
				cursor: 'default',
				color: 'black'
			}
		: null;

	return (
		<tr>
			<td>{candidate.name}</td>
			<td>{candidate.email}</td>
			<td>
				<Badge color={colorBadge}>{valueBadge}</Badge>
			</td>
			<td>
				{/* <Button disabled={valueButton} onClick={(e) => execButton(e)}>
					<i className={valueIcon} />
				</Button> */}
				<a
					href=""
					style={StyleButton}
					onClick={() => execButton()}
				>
					{TextButton}
				</a>
			</td>
		</tr>
	);
};
export default RowCandidate;
