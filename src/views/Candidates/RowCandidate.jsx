import React from 'react';
import {Button , Badge} from 'reactstrap'
const RowCandidate = (props) => {
    const candidate = props.candidate;
    console.error(candidate)
	return (
		<tr>
			<td>{candidate.name}</td>
            <td>{candidate.email}</td>
            <td><Badge color="warning">Hello</Badge></td>
            <td><Button><i className="cui-envelope-closed icons font-l d-block mt-1" ></i></Button></td>
		</tr>
	);
};
export default RowCandidate


