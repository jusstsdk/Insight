import { createRef } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import "../css/createCourse.css";

function AddSubject(props) {
	const Subject = createRef();
	const handleAddSubject = () => {
		let newSubject = Subject.current.value;
		props.setSubjects((subjects) => [...subjects, newSubject]);
		Subject.current.value = "";
	};
	return (
		<Form.Group as={Row}>
			<Form.Label column sm={1}>
				Subjects
			</Form.Label>
			<Col sm={2}>
				<Form.Control type="text" placeholder="Summary" ref={Subject} />
			</Col>
			<Button id="addSubject" onClick={handleAddSubject}>
				Add Subject
			</Button>
		</Form.Group>
	);
}

export default AddSubject;
