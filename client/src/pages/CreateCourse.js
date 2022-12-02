import { createRef, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import "../css/createCourse.css";
import AddSubject from "../components/AddSubject";
function CreateCourse() {
	const [Subjects, setSubjects] = useState([]);
	return (
		<Form className="d-flex flex-column" id="createCourseForm">
			<h1>Instructor Create Course</h1>
			<Form.Group
				as={Row}
				className="mb-3 d-flex align-items-center justify-content-start"
				controlId="formHorizontalEmail">
				<Form.Label column sm={1}>
					Title
				</Form.Label>
				<Col sm={3}>
					<Form.Control type="text" placeholder="Title" />
				</Col>

				<Form.Label column sm={1}>
					Price
				</Form.Label>
				<Col sm={2}>
					<Form.Control type="number" placeholder="Price" />
				</Col>

				<Form.Label column md={1} style={{ width: "10%" }}>
					Total Hours
				</Form.Label>
				<Col sm={2}>
					<Form.Control type="number" placeholder="Total Hours" />
				</Col>
			</Form.Group>

			{/* Summary */}
			<Form.Group as={Row} className="mb-3 d-flex align-items-center justify-content-start">
				<Form.Label column sm={1}>
					Summary
				</Form.Label>
				<Col sm={10}>
					<Form.Control as="textarea" type="text" placeholder="Summary" rows={3} />
				</Col>
			</Form.Group>
			<AddSubject Subjects={Subjects} setSubjects={setSubjects} />
		</Form>
	);
}

export default CreateCourse;
