import { Accordion, ListGroup, Form, Row, Col, Button } from "react-bootstrap";
import TrashIcon from "../../TrashIcon";
function ViewExercise(props) {
	return (
		<>
			{props.Questions.map((question, key) => {
				return (
					<Accordion.Item eventKey={`question_${key}`}>
						<div className="d-flex">
							<Accordion.Header className="accordionHeaderWidth">
								{question.question}
							</Accordion.Header>
							<Button
								className="accordionTrash"
								key={key}
								onClick={() => props.handleDeleteQuestion(key)}>
								<TrashIcon />
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
													key={`question_${key}_choice_${choice_key}`}
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
export default ViewExercise;
