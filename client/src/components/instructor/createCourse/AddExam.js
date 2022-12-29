import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { Form, Row, Col, Button, Accordion } from "react-bootstrap";
import { MdOutlineError } from "react-icons/md";
import { AiOutlineArrowLeft } from "react-icons/ai";
import {
	setExamTitle,
	addToExamQuestions,
	editExamQuestion,
	removeExamQuestions,
} from "../../../redux/createCourseSlice";

import ViewExercise from "../createCourse/ViewExercise";
import AddQuestion from "../createCourse/AddQuestion";
import { addNotification } from "../../../redux/notificationsSlice";

export default function AddExam(props) {
	const dispatch = useDispatch();
	const location = useLocation();
	const status = location.state.status;

	const ExamTitle = useSelector((state) => state.createCourseReducer.examTitle);
	const ExamQuestions = useSelector((state) => state.createCourseReducer.examQuestions);
	const [MissingTitle , setMissingTitle] = useState(false);
	const [NoQuestions , setNoQuestions] = useState(false);
	const [showAddModal, setShowAddModal] = useState(false);
	const handleAddModalClose = () => setShowAddModal(false);
	const handleAddModalShow = () => setShowAddModal(true);
	const handleAddQuestion = (question) => {
		dispatch(addToExamQuestions(question));
		handleAddModalClose();
	};
	const handleBack = () => {
		if (ExamTitle === "") {
			setMissingTitle(true);
		} else {
			setMissingTitle(false);
		}
		if (ExamQuestions.length === 0) {
			setNoQuestions(true);
		} else {
			setNoQuestions(false);
		}
		if (ExamTitle === "" || ExamQuestions.length === 0) {
			dispatch(
				addNotification({
					title: "Create Course",
					info: `Make sure your exam has a title and at least one question!`,
					color: "error",
				})
			);
			return;
		} else {
			
			props.setCurrentTab("addSubtitle")
		}


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
			<Row >{NoQuestions && <span className="error">"you must add atleast one question<MdOutlineError/>"</span>}</Row>
			<Form.Group as={Row} className="mb-3 d-flex align-items-center justify-content-start">
				<Form.Label column sm={2}>
					Exam title {MissingTitle && <span className="error">"missing<MdOutlineError/>"</span>}
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
			{/* Navigation and Actions */}
			<Col className="mb-3 me-3 fixed-bottom d-flex justify-content-center">
				{/* Go back to Subtitles */}
				<Button
					className="me-3"
					onClick={() => {
						handleBack();
					}}>
					<AiOutlineArrowLeft />
				</Button>
				{/* Save Course */}
				<Button
					className="me-3"
					onClick={() => {
						if (status === "New") props.handleCreateCourse("Draft");
						else props.handleEditCourse("Draft");
					}}>
					Save Course
				</Button>
				{/* Publish Course */}
				<Button
					onClick={() => {
						if (status === "New") props.handleCreateCourse("Published");
						else props.handleEditCourse("Published");
					}}>
					Publish Course
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
