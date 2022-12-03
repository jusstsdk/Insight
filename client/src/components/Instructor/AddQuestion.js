import { useRef, useState } from "react";
import { Form, Row, Col, Button, InputGroup, Card } from "react-bootstrap";
import "../../css/createCourse.css";
function AddQuestion(props) {
	const Question = useRef();
	const FirstChoice = useRef();
	const SecondChoice = useRef();
	const ThirdChoice = useRef();
	const FourthChoice = useRef();
	const [Choices, setChoices] = useState(["", "", "", ""]);
	const [CorrectAnswer, setCorrectAnswer] = useState("");

	const handleAddSubject = () => {
		let newQuestion = {
			question: Question.current.value,
			choices: Choices,
			correctAnswer: CorrectAnswer,
		};
		console.log(newQuestion);
		props.setQuestions((questions) => [...questions, newQuestion]);
	};

	return (
		<Card className="container-fluid">
			<Form.Group as={Row} className="mb-3 d-flex align-items-center justify-content-start">
				<Form.Label column sm={2}>
					Question
				</Form.Label>
				<Col sm={7}>
					<Form.Control type="text" placeholder="Question" ref={Question} />
				</Col>
			</Form.Group>
			<InputGroup
				className="mb-3"
				onChange={() => {
					setChoices([
						FirstChoice.current.value,
						SecondChoice.current.value,
						ThirdChoice.current.value,
						FourthChoice.current.value,
					]);
				}}>
				<InputGroup.Text>Choices</InputGroup.Text>
				<Form.Control placeholder="First Answer" aria-label="First Answer" ref={FirstChoice} />
				<Form.Control placeholder="Second Answer" aria-label="Second Answer" ref={SecondChoice} />
				<Form.Control placeholder="Third Answer" aria-label="Third Answer" ref={ThirdChoice} />
				<Form.Control placeholder="Fourth Answer" aria-label="Fourth Answer" ref={FourthChoice} />
			</InputGroup>
			<Form.Group as={Row} className="mb-3 d-flex align-items-center justify-content-start">
				<Form.Label column sm={2}>
					Correct Answer
				</Form.Label>
				<Col sm={6}>
					<Form.Select
						aria-label="Default select example"
						onChange={(e) => setCorrectAnswer(e.target.value)}>
						<option>Choose the correct answer</option>
						<option value={Choices[0]}>{Choices[0]}</option>
						<option value={Choices[1]}>{Choices[1]}</option>
						<option value={Choices[2]}>{Choices[2]}</option>
						<option value={Choices[3]}>{Choices[3]}</option>
					</Form.Select>
				</Col>
				<Col sm={2}>
					<Button id="addSubject" onClick={handleAddSubject}>
						Add Question
					</Button>
				</Col>
			</Form.Group>
		</Card>
	);
}

export default AddQuestion;
