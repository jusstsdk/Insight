import { useRef } from "react";
import { Form, Row, Col, Button, ListGroup } from "react-bootstrap";
import "../../../css/createCourse.css";
import TrashIcon from "../../TrashIcon";
function AddSubject(props) {
	const Subject = useRef();
	const handleAddSubject = () => {
		let newSubject = Subject.current.value;
		props.setSubjects((subjects) => [...subjects, newSubject]);
		Subject.current.value = "";
	};
	const handleDeleteSubject = (key) => {
		let newSubjects = props.Subjects.filter((subject, i) => i !== key);
		props.setSubjects(newSubjects);
	};

	return (
		<Form.Group as={Row} className="mb-3 d-flex align-items-center justify-content-start">
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
					{props.Subjects.map((subject, key) => (
						<ListGroup.Item
							key={key}
							as="li"
							className="d-flex justify-content-between align-items-center">
							<div className="fw-bold mr-1">{subject}</div>
							<Button key={key} className="trashButton" onClick={() => handleDeleteSubject(key)}>
								<TrashIcon key={key} />
							</Button>
						</ListGroup.Item>
					))}
				</ListGroup>
			</Col>
		</Form.Group>
	);
}

export default AddSubject;
