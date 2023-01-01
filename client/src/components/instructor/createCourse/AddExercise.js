import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Row, Col, Button, Modal } from "react-bootstrap";
import { MdOutlineError } from "react-icons/md";

import { addExerciseToSubtitle, editExerciseOfSubtitle } from "../../../redux/createCourseSlice";

export default function AddExercise(props) {
	const dispatch = useDispatch();
	const SubtitleKey = props.subtitleKey;
	const exerciseIndex = useSelector(
		(state) => state.createCourseReducer.subtitlesIndices[SubtitleKey]
	);
	const [Title, setTitle] = useState(props.case === "Add" ? "" : props.exercise.title);
	const [MissingTitle, setMissingTitle] = useState(false);

	const handleAddExercise = () => {
		if (Title === "") {
			setMissingTitle(true);
		} else {
			setMissingTitle(false);
		}
		if (Title === "") {
			return;
		}
		if (props.case === "Add") {
			let newExercise = { title: Title, questions: [], index: exerciseIndex };
			dispatch(addExerciseToSubtitle({ subtitleKey: SubtitleKey, exercise: newExercise }));
		} else {
			dispatch(
				editExerciseOfSubtitle({
					subtitleKey: props.subtitleKey,
					exerciseKey: props.exerciseKey,
					title: Title,
				})
			);
		}
		setTitle("");
		props.handleClose();
	};

	return (
		<Modal
			show={props.show}
			onHide={props.handleClose}
			backdrop="static"
			keyboard={false}
			size="xl"
			dialogClassName="modal-90w"
			aria-labelledby="example-custom-modal-styling-title"
			centered>
			<Modal.Header closeButton>
				<Modal.Title id="example-custom-modal-styling-title">
					{props.case === "Add" ? "Adding" : "Editting"} an Exercise
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form.Group as={Row} className="mb-3 d-flex align-items-center justify-content-start">
					<Form.Label column sm={2}>
						Exercise title
					</Form.Label>
					<Col sm={7}>
						<Form.Control
							type="text"
							placeholder="Title"
							value={Title}
							onChange={(e) => {
								setTitle(e.target.value);
							}}
						/>
						{MissingTitle && <h6 className="error">Missing Title <MdOutlineError/></h6>}
					</Col>
				</Form.Group>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={props.handleClose}>
					Close
				</Button>
				<Button id="addSubject" onClick={handleAddExercise}>
					{props.case} Exercise
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
