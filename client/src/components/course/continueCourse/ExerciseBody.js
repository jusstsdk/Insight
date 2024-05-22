import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, ListGroupItem, Row } from "react-bootstrap";
import {
	setOldGrade,
	setShowAnswers,
	setSolve,
	updateAnswer,
} from "../../../redux/continueCourseSlice";
export default function ExerciseBody({ handleSubmitAnswers, MissingAnswer, Grade, OldGrade }) {
	// Setup
	const dispatch = useDispatch();

	// Page Control
	const Content = useSelector((state) => state.continueCourseReducer.content);
	const IsSolved = useSelector((state) => state.continueCourseReducer.isSolved);
	const Answers = useSelector((state) => state.continueCourseReducer.answers);
	const CorrectAnswers = useSelector((state) => state.continueCourseReducer.correctAnswers);
	const ShowAnswers = useSelector((state) => state.continueCourseReducer.showAnswers);

	// Handles choosing an Answer for a Question.
	const handleChoiceClick = (questionIndex, questionId, choice) => {
		dispatch(
			updateAnswer({
				answerIndex: questionIndex,
				answer: {
					questionIndex: questionIndex,
					questionId: questionId,
					choice: choice,
				},
			})
		);
	};

	return (
		<Form>
			{/* Displaying Exercise */}
			{Content.questions.map((question, question_index) => (
				<ListGroupItem key={`question_${question._id}`} className="mb-3">
					<Row>
						{/* Question Title */}
						<Col sm={10}>
							<h5 className="fitWidth">
								{question_index + 1}. {question.question}
							</h5>
						</Col>
						{/* Recieved Grade for the Question */}
						{IsSolved && (
							<Col sm={2}>
								<h6
									className={
										question.correctAnswer === Answers[question_index].choice ? "success" : "error"
									}>
									{question.correctAnswer === Answers[question_index].choice ? 1 : 0}/1 point
								</h6>
							</Col>
						)}
					</Row>
					{/* Displaying the Question Choices */}
					{question.choices.map((choice, choice_index) => (
						<Col sm={10}>
							<Form.Check
								key={`question_${question._id}_choice_${choice}_${choice_index}_check`}
								type="radio"
								id={`${question._id}_${choice}`}>
								{/* Checkbox */}
								<Form.Check.Input
									key={`question_${question._id}_choice_${choice}_${choice_index}_input`}
									type="radio"
									checked={choice === Answers[question_index].choice}
									onChange={() => handleChoiceClick(question_index, question._id, choice)}
									isValid={
										IsSolved
											? question.correctAnswer === choice &&
											  Answers[question_index].choice === choice
											: ""
									}
									isInvalid={
										IsSolved
											? question.correctAnswer !== choice &&
											  Answers[question_index].choice === choice
											: ""
									}
									disabled={IsSolved}
								/>
								{/* Choice */}
								<Form.Check.Label
									className={
										IsSolved ? (ShowAnswers && Answers[question_index].choice === choice ? "solved" : "") : ""
									}
									key={`question_${question._id}_choice_${choice}_${choice_index}_label`}>
									{choice} {IsSolved && choice === Answers[question_index].choice ? IsSolved
									&& question.correctAnswer !== choice &&
									Answers[question_index].choice === choice ? '(Неверно)' : '(Верно)' : '' }
								</Form.Check.Label>
							</Form.Check>
						</Col>
					))}

					{/* Correct Answer */}
					{ShowAnswers && (
						<h6 className="fitWidth my-3">
							<span className="fst-italic">Correct Answer: </span>
							<span className="success">
								{CorrectAnswers.find((answer) => answer.questionId === question._id).choice}
							</span>
						</h6>
					)}
				</ListGroupItem>
			))}

			{/* Grades Controls */}
			{IsSolved && (
				<>
					{/* Grades */}
					<Row className="justify-content-end">
						{/* Recieved Grade */}
						<h6 className="fitWidth">
							Grade Recieved:{"   "}
							<span className={Grade / Content.maxGrade >= 0.5 ? "success" : "error"}>
								{((Grade / Content.maxGrade) * 100).toFixed(2)}
							</span>
						</h6>

						{/* Best Grade */}
						{OldGrade > Grade && (
							<h6 className="fitWidth">
								Best Received: {"   "}
								<span className={OldGrade / Content.maxGrade >= 0.5 ? "success" : "error"}>
									{((OldGrade / Content.maxGrade) * 100).toFixed(2)}
								</span>
							</h6>
						)}
					</Row>

					{/* Controls */}
					<Col className="ms-auto mt-3 fitWidth">
						{/* Try again */}
						<Button
							onClick={() => {
								dispatch(setOldGrade(Content.receivedGrade));
								dispatch(setSolve(false));
								dispatch(setShowAnswers(false));
							}}>
							Try again
						</Button>
						{/* Show Answers */}
						{Grade / Content.maxGrade !== 1 && !ShowAnswers && (
							<Button
								className="ms-3"
								onClick={() => {
									dispatch(setShowAnswers(true));
								}}>
								Show Correct Answers
							</Button>
						)}
					</Col>
				</>
			)}
			{/* Missing Answer Error */}
			{MissingAnswer && <h6 className="error">You have to choose an answer to each question!</h6>}
			{/* Submit Button */}
			{!IsSolved && (
				<div className="d-flex justify-content-end">
					<Button onClick={handleSubmitAnswers}>Submit Answers</Button>
				</div>
			)}
		</Form>
	);
}
