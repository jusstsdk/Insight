import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Row, Col, Button, Accordion } from "react-bootstrap";

import {
	setExerciseTitle,
	addToExerciseQuestions,
	removeExerciseQuestions,
	addExerciseToSubtitleExercises,
} from "../../../redux/createCourseSlice";

import ViewExercise from "../updatedCreateCourse/ViewExercise";
import AddQuestion from "../updatedCreateCourse/AddQuestion";

export default function AddExercise(props) {
	const dispatch = useDispatch();
	const [CurrentComponent, setCurrentComponent] = useState("viewExercise");
	const ExerciseTitle = useSelector((state) => state.createCourseReducer.exerciseTitle);
	const ExerciseQuestions = useSelector((state) => state.createCourseReducer.exerciseQuestions);

	const handleAddQuestion = (question) => {
		dispatch(addToExerciseQuestions(question));
		setCurrentComponent("viewExercise");
	};

	const handleAddExercise = () => {
		dispatch(addExerciseToSubtitleExercises());
		props.setCurrentComponent("addSubtitle");
	};

	const displayComponent = () => {
		switch (CurrentComponent) {
			case "viewExercise":
				return (
					<>
						<Form.Group as={Row} className="mb-3 d-flex align-items-center justify-content-start">
							<Form.Label column sm={2}>
								Exercise title
							</Form.Label>
							<Col sm={7}>
								<Form.Control
									type="text"
									placeholder="Title"
									onChange={(e) => {
										dispatch(setExerciseTitle(e.target.value));
									}}
									value={ExerciseTitle}
								/>
							</Col>
						</Form.Group>

						<Accordion>
							<ViewExercise
								key="view_exercise_questions"
								Questions={ExerciseQuestions}
								delete={true}
								handleDeleteQuestion={(key) => dispatch(removeExerciseQuestions(key))}
							/>
						</Accordion>
						<Col className="nextButton">
							<Button
								className="me-3"
								onClick={() => {
									setCurrentComponent("addQuestion");
								}}>
								Add a Question
							</Button>

							<Button onClick={handleAddExercise}>Add Exercise</Button>
						</Col>
					</>
				);

			case "addQuestion":
				return <AddQuestion handleAddQuestion={handleAddQuestion} />;
			default:
		}
	};

	return <>{displayComponent()}</>;
}
