import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Row, Col, Button, ListGroup } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";

import { addSubject, removeSubject } from "../../../redux/infoSlice";

export default function AddSubject() {
	const dispatch = useDispatch();

	const Subject = useRef();
	const InfoSubjects = useSelector((state) => state.infoReducer.subjects);

	const handleAddSubject = () => {
		let newSubject = Subject.current.value;
		Subject.current.value = "";
		dispatch(addSubject(newSubject));
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
					{InfoSubjects.map((subject, key) => (
						<ListGroup.Item
							key={key}
							as="li"
							className="d-flex justify-content-between align-items-center">
							<div className="fw-bold mr-1">{subject}</div>
							<Button
								key={key}
								className="trashButton"
								onClick={() => dispatch(removeSubject(key))}>
								<BsTrash key={key} className="trashIcon" />
							</Button>
						</ListGroup.Item>
					))}
				</ListGroup>
			</Col>
		</Form.Group>
	);
}
