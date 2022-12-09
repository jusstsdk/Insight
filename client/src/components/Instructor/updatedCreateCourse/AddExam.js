import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Row, Col, Button, Accordion } from "react-bootstrap";

import {
	setExamTitle,
	addToExamQuestions,
	removeExamQuestions,
} from "../../../redux/createCourseSlice";

import ViewExercise from "../updatedCreateCourse/ViewExercise";
import AddQuestion from "../updatedCreateCourse/AddQuestion";

export default function AddExam(props) {
	const dispatch = useDispatch();
	const [CurrentComponent, setCurrentComponent] = useState("viewExam");
	const ExamTitle = useSelector((state) => state.createCourseReducer.examTitle);
	const ExamQuestions = useSelector((state) => state.createCourseReducer.examQuestions);

	const handleAddQuestion = (question) => {
		dispatch(addToExamQuestions(question));
		setCurrentComponent("viewExam");
	};

	const displayComponent = () => {
		switch (CurrentComponent) {
			case "viewExam":
				return (
					<>
						<Form.Group as={Row} className="mb-3 d-flex align-items-center justify-content-start">
							<Form.Label column sm={2}>
								Exam title
							</Form.Label>
							<Col sm={7}>
								<Form.Control
									type="text"
									placeholder="Title"
									onChange={(e) => {
										dispatch(setExamTitle(e.target.value));
									}}
									value={ExamTitle}
								/>
							</Col>
						</Form.Group>

						<Accordion>
							<ViewExercise
								key="view_exam_questions"
								Questions={ExamQuestions}
								delete={true}
								handleDeleteQuestion={(key) => dispatch(removeExamQuestions(key))}
							/>
						</Accordion>
						<Col className="nextButton">
							<Button
								className="me-3"
								onClick={() => {
									props.setCurrentTab("addInfo");
								}}>
								Go Back
							</Button>
							<Button
								className="me-3"
								onClick={() => {
									setCurrentComponent("addQuestion");
								}}>
								Add a Question
							</Button>

							<Button
								onClick={() => {
									props.setCurrentTab("addSubtitle");
								}}>
								Done and go to Next
							</Button>
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
