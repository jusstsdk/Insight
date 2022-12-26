import { Button, Col, Form, ListGroupItem, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setOldGrade, setSolve, updateAnswer } from "../../redux/continueCourseSlice";
export default function ExerciseBody({ handleSubmitAnswers, MissingAnswer, Grade, OldGrade }) {
	const dispatch = useDispatch();
	const Content = useSelector((state) => state.continueCourseReducer.content);
	const ContentType = useSelector((state) => state.continueCourseReducer.contentType);

	const IsSolved = useSelector((state) => state.continueCourseReducer.isSolved);
	const Answers = useSelector((state) => state.continueCourseReducer.answers);

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
			{Content.questions.map((question, question_index) => (
				<ListGroupItem key={`question_${question._id}`} className="mb-3">
					<Row>
						<Col sm={10}>
							<h6>{question.question}</h6>
						</Col>
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
					{question.choices.map((choice, choice_index) => (
						<Form.Check
							key={`question_${question._id}_choice_${choice}_${choice_index}_check`}
							type="radio"
							id={`${question._id}_${choice}`}>
							<Form.Check.Input
								key={`question_${question._id}_choice_${choice}_${choice_index}_input`}
								type="radio"
								checked={choice === Answers[question_index].choice}
								onChange={() => handleChoiceClick(question_index, question._id, choice)}
								isValid={
									IsSolved
										? question.correctAnswer === choice && Answers[question_index].choice === choice
										: ""
								}
								isInvalid={
									IsSolved
										? question.correctAnswer !== choice && Answers[question_index].choice === choice
										: ""
								}
								disabled={IsSolved}
							/>
							<Form.Check.Label
								className={
									IsSolved ? (Answers[question_index].choice === choice ? "solved" : "") : ""
								}
								key={`question_${question._id}_choice_${choice}_${choice_index}_label`}>
								{choice}
							</Form.Check.Label>
						</Form.Check>
					))}
				</ListGroupItem>
			))}
			{IsSolved && (
				<>
					<Row className="justify-content-end">
						<h6 className="gradeRecieved">
							Grade Recieved:{"   "}
							<span className={Grade / Content.maxGrade >= 0.5 ? "success" : "error"}>
								{((Grade / Content.maxGrade) * 100).toFixed(2)}
							</span>
						</h6>

						{OldGrade > Grade && (
							<h6 className="gradeRecieved">
								Best Received: {"   "}
								<span className={OldGrade / Content.maxGrade >= 0.5 ? "success" : "error"}>
									{((OldGrade / Content.maxGrade) * 100).toFixed(2)}
								</span>
							</h6>
						)}
					</Row>
					<Col className="ms-auto gradeRecieved">
						<Button
							onClick={() => {
								dispatch(setOldGrade(Content.receivedGrade));
								dispatch(setSolve(false));
							}}>
							Try again
						</Button>
					</Col>
					{ContentType === "Exam" && Content.receivedGrade / Content.maxGrade > 0.5 && (
						<Col className="ms-auto gradeRecieved">
							<Button onClick={() => console.log("Get Certificate")}>Get Certificate</Button>
						</Col>
					)}
				</>
			)}
			{MissingAnswer && <h6 className="error">You have to choose an answer to each question!</h6>}
			{!IsSolved && <Button onClick={handleSubmitAnswers}>Submit Answers</Button>}
		</Form>
	);
}
