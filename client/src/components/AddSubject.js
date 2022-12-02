import { createRef } from "react";
import { Form, Row, Col, Button, Badge, ListGroup } from "react-bootstrap";
import "../css/createCourse.css";
import TrashIcon from "./TrashIcon";
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
				<Form.Control type="text" placeholder="Subject" ref={Subject} />
			</Col>
			<Button id="addSubject" onClick={handleAddSubject}>
				Add Subject
			</Button>
			<Col className="overflow-auto">
				<ListGroup horizontal sm={7} className="flex-wrap">
					{props.Subjects.map((subject, i) => (
						<ListGroup.Item
							key={"subject_" + i}
							as="li"
							className="d-flex justify-content-between align-items-center">
							<div className="fw-bold mr-1">{subject}</div>
							<TrashIcon key={"trashicon_" + i} />
						</ListGroup.Item>
					))}
				</ListGroup>
			</Col>
		</Form.Group>
	);
}

export default AddSubject;
