import { useState } from "react";
import { Card, ListGroup, Form, Row, Col, Button } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";

import AddQuestion from "./AddQuestion";

export default function ViewExercise(props) {
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
					<Card key={`question_${question_key}`} className="mb-2">
						<div className="d-flex">
							<Col sm={11} className="me-auto">
								<Card.Header className="accordionHeaderWidth accordionLikeHeader d-flex align-items-center">
									<h6 className="questionTitle">{question.question}</h6>
								</Card.Header>
							</Col>
							<Col sm={1} className="d-flex justify-content-end">
								<Button
									variant="success"
									className="accordionTrash accordionLikeEditButton"
									key={`exercise_edit_button_${question_key}`}
									onClick={() => handleEditModalShow(question, question_key)}>
									<AiOutlineEdit key={"exercise_edit_" + question_key} />
								</Button>
								<Button
									className="accordionTrash accordionLikeDeleteButton"
									variant="danger"
									key={`exercise_trash_button_${question_key}`}
									onClick={() => props.handleDeleteQuestion(question_key)}>
									<BsTrash key={"exercise_trash_" + question_key} />
								</Button>
							</Col>
						</div>
						<Card.Body>
							<Form.Group as={Row} className="d-flex align-items-center justify-content-evenly">
								<Col>
									<ListGroup>
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
						</Card.Body>
					</Card>
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
