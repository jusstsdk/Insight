import {
	Button,
	Form,
	Card,
	Badge,
	Alert,
	ListGroup,
	Tabs,
	Tab,
	Container,
	Row,
	Col,
	Table,
	Modal,
	Overlay,
	OverlayTrigger,
	Tooltip,
} from "react-bootstrap";

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function CourseSubtitlesList(props) {
	const course = props.course;
	const newId = props.newId;

	return (
		<>
			<Table striped>
				<thead>
					<tr>
						<th>#</th>
						<th>Title</th>
						<th>Hours</th>
					</tr>
				</thead>
				<tbody>
					{course.subtitles.map((subtitle, index) => {
						return (
							<tr>
								<td>{index + 1}</td>
								<td>{subtitle.title ? subtitle.title : "No Title."}</td>
								<td>{subtitle.hours}</td>
								<td>
									<Button key={"Button Subtitle" + index}>View</Button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		</>
	);
}

export default CourseSubtitlesList;
