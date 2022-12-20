import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Row, Col, Button, Accordion } from "react-bootstrap";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import {
	setExamTitle,
	addToExamQuestions,
	editExamQuestion,
	removeExamQuestions,
} from "../../../redux/createCourseSlice";

import ViewExercise from "../createCourse/ViewExercise";
import AddQuestion from "../createCourse/AddQuestion";

export default function AddExam(props) {
	const dispatch = useDispatch();
	const ExamTitle = useSelector((state) => state.createCourseReducer.examTitle);
	const ExamQuestions = useSelector((state) => state.createCourseReducer.examQuestions);
	const [showAddModal, setShowAddModal] = useState(false);
	const handleAddModalClose = () => setShowAddModal(false);
	const handleAddModalShow = () => setShowAddModal(true);
	const handleAddQuestion = (question) => {
		dispatch(addToExamQuestions(question));
		handleAddModalClose();
	};

	return (
		<>
			<Row>
				<Col>
					<h1 className="fs-3 fw-semibold text-muted">Adding Course Exam</h1>
				</Col>
				<Col className="d-flex justify-content-end">
					<Button onClick={handleAddModalShow}>Add a Question</Button>
				</Col>
			</Row>
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
					case="Exam"
					key="view_exam_questions"
					Questions={ExamQuestions}
					handleAddQuestion={(key, newQuestion) =>
						dispatch(editExamQuestion({ key: key, question: newQuestion }))
					}
					handleDeleteQuestion={(key) => dispatch(removeExamQuestions(key))}
				/>
			</Accordion>
			<Col className="mb-3 me-3 fixed-bottom d-flex justify-content-center">
				<Button
					className="me-3"
					onClick={() => {
						props.setCurrentTab("addInfo");
					}}>
					<AiOutlineArrowLeft />
				</Button>

				<Button
					onClick={() => {
						props.setCurrentTab("addSubtitle");
					}}>
					<AiOutlineArrowRight />
				</Button>
			</Col>
			<AddQuestion
				case="Add"
				handleAddQuestion={handleAddQuestion}
				show={showAddModal}
				handleClose={handleAddModalClose}
			/>
		</>
	);
}
