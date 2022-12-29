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
		if (props.case === "Exam")
			props.handleAddQuestion(question_key, newQuestion);
		else props.handleAddQuestion(props.exerciseKey, question_key, newQuestion);
		handleEditModalClose();
	};
	return (
		<>
			{props.Questions.map((question, question_key) => {
				return (
					<div key={`question_${question_key}`} className="mb-4">
						<div className="d-flex">
							<Col sm={11} className="me-auto">
								<Card className="border-0 questionTitleContainer">
									<Card.Header className=" accordionHeaderWidth accordionLikeHeader d-flex align-items-center border-bottom-0">
										<h6 className="questionTitle">{question.question}</h6>
									</Card.Header>
								</Card>
							</Col>
							<Col sm={1} className="d-flex justify-content-end">
								<Button
									variant="dark"
									className="accordionTrash accordionLikeEditButton"
									key={`exercise_edit_button_${question_key}`}
									onClick={() => handleEditModalShow(question, question_key)}
								>
									<AiOutlineEdit key={"exercise_edit_" + question_key} />
								</Button>
								<Button
									className="accordionTrash accordionLikeDeleteButton"
									variant="primary"
									key={`exercise_trash_button_${question_key}`}
									onClick={() => props.handleDeleteQuestion(question_key)}
								>
									<BsTrash key={"exercise_trash_" + question_key} />
								</Button>
							</Col>
						</div>
						<div>
							<Form.Group
								as={Row}
								className="d-flex align-items-center justify-content-evenly"
							>
								<Col>
									<ListGroup variant="flush">
										{question.choices.map((choice, choice_key) => {
											return (
												<ListGroup.Item
													key={`question_${question_key}_choice_${choice_key}`}
													variant={
														choice === question.correctAnswer ? "success" : ""
													}
												>
													Choice {choice_key + 1} : {choice}
												</ListGroup.Item>
											);
										})}
									</ListGroup>
								</Col>
							</Form.Group>
						</div>
					</div>
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
