import { Accordion, ListGroup, Form, Row, Col, Button } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";

export default function ViewExercise(props) {
	return (
		<>
			{props.Questions.map((question, question_key) => {
				return (
					<Accordion.Item eventKey={`question_${question_key}`} key={`question_${question_key}`}>
						<div className="d-flex">
							<Accordion.Header className="accordionHeaderWidth">
								{question.question}
							</Accordion.Header>
							{props.delete && (
								<Button
									className="accordionTrash"
									key={question_key}
									onClick={() => props.handleDeleteQuestion(question_key)}>
									<BsTrash key={"exercise_trash_" + question_key} className="trashIcon" />
								</Button>
							)}
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
		</>
	);
}
