import { useRef, useState } from "react";
import { Form, Row, Col, Button, Card, Accordion, ListGroup } from "react-bootstrap";
import AddQuestion from "./AddQuestion";
import "../../css/createCourse.css";
import ViewExercise from "./ViewExercise";
function AddExercise(props) {
	const Title = useRef();
	const [Questions, setQuestions] = useState([]);
	const handleDeleteQuestion = (key) => {
		let newQuestions = Questions.filter((question, i) => i !== key);
		setQuestions(newQuestions);
	};
	const handleAddExercise = () => {
		let newExercise = {
			title: Title.current.value,
			questions: Questions,
		};
		if (props.type === "Exam") {
			props.setState(newExercise);
		} else {
			props.setState((exercises) => [...exercises, newExercise]);
		}
		Title.current.value = "";
		setQuestions([]);
	};

	return (
		<>
			<Form.Group as={Row} className="mb-3 d-flex align-items-center justify-content-start">
				<Form.Label column sm={2}>
					{props.type} title
				</Form.Label>
				<Col sm={7}>
					<Form.Control type="text" placeholder="Title" ref={Title} />
				</Col>
				<Col>
					<Button id="addSubject" onClick={handleAddExercise}>
						Add {props.type}
					</Button>
				</Col>
			</Form.Group>
			<AddQuestion Questions={Questions} setQuestions={setQuestions} />
			<Accordion>
				<ViewExercise Questions={Questions} handleDeleteQuestion={handleDeleteQuestion} />
			</Accordion>
		</>
	);
}

export default AddExercise;
