import { useState, useEffect } from "react";
import {
	Form,
	Row,
	Col,
	Button,
	InputGroup,
	Popover,
	OverlayTrigger,
	Modal,
	FormLabel,
} from "react-bootstrap";

export default function AddQuestion(props) {
	const [Question, setQuestion] = useState(props.case === "Add" ? "" : props.question.question);
	const [FirstChoice, setFirstChoice] = useState(
		props.case === "Add" ? "" : props.question.choices[0]
	);
	const [SecondChoice, setSecondChoice] = useState(
		props.case === "Add" ? "" : props.question.choices[1]
	);
	const [ThirdChoice, setThirdChoice] = useState(
		props.case === "Add" ? "" : props.question.choices[2]
	);
	const [FourthChoice, setFourthChoice] = useState(
		props.case === "Add" ? "" : props.question.choices[3]
	);
	const [Choices, setChoices] = useState(
		props.case === "Add" ? ["", "", "", ""] : props.question.choices
	);
	const [CorrectAnswer, setCorrectAnswer] = useState(
		props.case === "Add" ? "default" : props.question.correctAnswer
	);

	const [MissingCorrectAnswer, setMissingCorrectAnswer] = useState(false);

	const handleAddQuestion = (e) => {
		if (
			(CorrectAnswer !== FirstChoice) &
			(CorrectAnswer !== SecondChoice) &
			(CorrectAnswer !== ThirdChoice) &
			(CorrectAnswer !== FourthChoice) &
			(CorrectAnswer !== "default")
		) {
			setMissingCorrectAnswer(true);
			setCorrectAnswer("default");
			return;
		}
		if (CorrectAnswer === "default") {
			setMissingCorrectAnswer(true);
			return;
		} else setMissingCorrectAnswer(false);
		let newQuestion = {
			question: Question,
			choices: Choices,
			correctAnswer: CorrectAnswer,
		};
		setQuestion("");
		setFirstChoice("");
		setSecondChoice("");
		setThirdChoice("");
		setFourthChoice("");
		setChoices(["", "", "", ""]);
		setCorrectAnswer("default");
		if (props.case === "Add") props.handleAddQuestion(newQuestion);
		else {
			props.handleAddQuestion(props.question_key, newQuestion);
		}
		props.handleClose();
	};
	const popover = (
		<Popover id="popover-basic" className="align-items-center">
			<Popover.Header as="h3">Can't add question!!!</Popover.Header>
			<Popover.Body className="error">Please choose a correct answer</Popover.Body>
		</Popover>
	);
	useEffect(() => {
		setChoices([FirstChoice, SecondChoice, ThirdChoice, FourthChoice]);
	}, [FirstChoice, SecondChoice, ThirdChoice, FourthChoice]);
	return (
		<>
			<Modal
				show={props.show}
				onHide={() => {
					setCorrectAnswer("default");
					props.handleClose();
				}}
				backdrop="static"
				keyboard={false}
				size="xl"
				dialogClassName="modal-90w"
				aria-labelledby="example-custom-modal-styling-title"
				centered>
				<Modal.Header closeButton>
					<Modal.Title id="example-custom-modal-styling-title">
						{props.case === "Add" ? "Adding" : "Editting"} a Question
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group as={Row} className="mb-3 d-flex align-items-center justify-content-start">
						<Form.Label column sm={2}>
							Question
						</Form.Label>
						<Col sm={7}>
							<Form.Control
								as="textarea"
								type="text"
								placeholder="Question"
								value={Question}
								onChange={(e) => setQuestion(e.target.value)}
							/>
						</Col>
					</Form.Group>
					<Col className="mb-3">
						<Row className="mb-2 d-flex align-items-center">
							<Col sm={2}>
								<FormLabel>Choice 1</FormLabel>
							</Col>
							<Col sm={9}>
								<Form.Control
									as="textarea"
									placeholder="First Answer"
									aria-label="First Answer"
									value={FirstChoice}
									onChange={(e) => setFirstChoice(e.target.value)}
								/>
							</Col>
						</Row>
						<Row className="mb-2 d-flex align-items-center">
							<Col sm={2}>
								<FormLabel>Choice 2</FormLabel>
							</Col>
							<Col sm={9}>
								<Form.Control
									as="textarea"
									placeholder="Second Answer"
									aria-label="Second Answer"
									value={SecondChoice}
									onChange={(e) => setSecondChoice(e.target.value)}
								/>
							</Col>
						</Row>
						<Row className="mb-2 d-flex align-items-center">
							<Col sm={2}>
								<FormLabel>Choice 3</FormLabel>
							</Col>
							<Col sm={9}>
								<Form.Control
									as="textarea"
									placeholder="Third Answer"
									aria-label="Third Answer"
									value={ThirdChoice}
									onChange={(e) => setThirdChoice(e.target.value)}
								/>
							</Col>
						</Row>
						<Row className="mb-2 d-flex align-items-center">
							<Col sm={2}>
								<FormLabel>Choice 4</FormLabel>
							</Col>
							<Col sm={9}>
								<Form.Control
									as="textarea"
									placeholder="Fourth Answer"
									aria-label="Fourth Answer"
									value={FourthChoice}
									onChange={(e) => setFourthChoice(e.target.value)}
								/>
							</Col>
						</Row>
					</Col>
					<Form.Group as={Row} className="mb-3 d-flex align-items-center justify-content-start">
						<Form.Label column sm={2}>
							Correct Answer
						</Form.Label>
						<Col sm={3}>
							<Form.Select
								value={CorrectAnswer}
								aria-label="Default select example"
								onChange={(e) => {
									setCorrectAnswer(e.target.value);
									setMissingCorrectAnswer(false);
								}}>
								<option value="default">Choose the correct answer</option>
								<option value={Choices[0]}>Choice 1</option>
								<option value={Choices[1]}>Choice 2</option>
								<option value={Choices[2]}>Choice 3</option>
								<option value={Choices[3]}>Choice 4</option>
							</Form.Select>
						</Col>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="secondary"
						onClick={() => {
							setCorrectAnswer("default");
							props.handleClose();
						}}>
						Close
					</Button>
					<OverlayTrigger
						trigger="click"
						placement="right"
						rootClose
						show={MissingCorrectAnswer}
						overlay={MissingCorrectAnswer ? popover : <></>}>
						<Button id="addSubject" onClick={handleAddQuestion}>
							{props.case} Question
						</Button>
					</OverlayTrigger>
				</Modal.Footer>
			</Modal>
		</>
	);
}
