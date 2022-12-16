import { useState } from "react";
import { useDispatch } from "react-redux";
import { Accordion, ListGroup, Form, Row, Col, Button } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import AddQuestion from "./AddQuestion";
export default function ViewExercise(props) {
	const dispatch = useDispatch();
	const [EditQuestionKey, setEditQuestionKey] = useState();
	const [Question, setQuestion] = useState({});
	const [ShowEditModal, setShowEditModal] = useState(false);
	const handleEditModalClose = () => setShowEditModal(false);
	const handleEditModalShow = (question, question_key) => {
		setQuestion(question);
		setEditQuestionKey(question_key);
		setShowEditModal(true);
	};
	const handleEditQuestion = (question_key, newQuestion) => {
		if (props.case === "Exam") props.handleAddQuestion(question_key, newQuestion);
		else props.handleAddQuestion(props.exerciseKey, question_key, newQuestion);
		handleEditModalClose();
	};
	return (
		<>
			{props.Questions.map((question, question_key) => {
				return (
					<Accordion.Item eventKey={`question_${question_key}`} key={`question_${question_key}`}>
						<div className="d-flex">
							<Accordion.Header className="accordionHeaderWidth">
								<h6>{question.question}</h6>
							</Accordion.Header>
							<Button
								className="accordionTrash"
								key={"exercise_trash_button_" + question_key}
								onClick={() => props.handleDeleteQuestion(question_key)}>
								<BsTrash key={"exercise_trash_" + question_key} className="trashIcon" />
							</Button>
							<Button
								className="accordionTrash"
								key={"exercise_edit_button_" + question_key}
								onClick={() => {
									handleEditModalShow(question, question_key);
								}}>
								<AiOutlineEdit key={"exercise_edit_" + question_key} className="trashIcon" />
							</Button>
						</div>
						<Accordion.Body>
							<Form.Group as={Row} className="d-flex align-items-center justify-content-evenly">
								<Form.Label column sm={2}>
									Choices
								</Form.Label>
								<Col>
									<ListGroup horizontal>
										{question.choices.map((choice, choice_key) => {
											return (
												<ListGroup.Item
													key={`question_${question_key}_choice_${choice_key}`}
													variant={choice === question.correctAnswer ? "success" : ""}>
													{choice}
												</ListGroup.Item>
											);
										})}
									</ListGroup>
								</Col>
							</Form.Group>
						</Accordion.Body>
					</Accordion.Item>
				);
			})}
			{ShowEditModal && (
				<AddQuestion
					case="Edit"
					handleAddQuestion={handleEditQuestion}
					show={ShowEditModal}
					handleClose={handleEditModalClose}
					question_key={EditQuestionKey}
					question={Question}
				/>
			)}
		</>
	);
}
