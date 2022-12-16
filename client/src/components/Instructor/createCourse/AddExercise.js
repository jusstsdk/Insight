import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Row, Col, Button, Accordion, Modal } from "react-bootstrap";

import {
	setExerciseTitle,
	addToExerciseQuestions,
	removeExerciseQuestions,
	addExerciseToSubtitle,
	editExerciseOfSubtitle,
} from "../../../redux/createCourseSlice";

import ViewExercise from "../updatedCreateCourse/ViewExercise";
import AddQuestion from "../updatedCreateCourse/AddQuestion";

export default function AddExercise(props) {
	const dispatch = useDispatch();

	// const handleAddQuestion = (question) => {
	// 	dispatch(addToExerciseQuestions(question));
	// 	setCurrentComponent("viewExercise");
	// };
	const [Title, setTitle] = useState(props.case === "Add" ? "" : props.exercise.title);

	const SubtitleKey = props.subtitleKey;

	const handleAddExercise = () => {
		let newExercise = { title: Title, questions: [] };
		if (props.case === "Add") {
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

	// const displayComponent = () => {
	// 	switch (CurrentComponent) {
	// 		case "addQuestion":
	// 			return <AddQuestion handleAddQuestion={handleAddQuestion} />;
	// 		default:
	// 	}
	// };

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
				<Modal.Title id="example-custom-modal-styling-title">Adding a Subtitle</Modal.Title>
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
