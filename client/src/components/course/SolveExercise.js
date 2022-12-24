import { Button, Col, Form, ListGroupItem, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import API from "../../functions/api";
import { setUser, solveExercise } from "../../redux/userSlice";
import { useState } from "react";
import {
	initializeAnswers,
	setContent,
	setIsSolved,
	updateAnswer,
} from "../../redux/continueCourseSlice";
export default function SolveExercise(props) {
	// Data Setup
	const dispatch = useDispatch();
	const user = useSelector((state) => state.userReducer.user);
	const SubtitleIndex = useSelector((state) => state.continueCourseReducer.subtitleIndex);
	const Content = useSelector((state) => state.continueCourseReducer.content);

	// Gets Course Index in the User's Courses.
	const courseIndex = useSelector((state) => state.userReducer.user.courses).findIndex(
		(course) => course.course === props.CourseId
	);
	const exerciseIndex = user.courses[courseIndex].subtitles[SubtitleIndex].exercises.findIndex(
		(video) => video._id === Content._id
	);
	const IsSolved = useSelector((state) => state.continueCourseReducer.isSolved);
	const Answers = useSelector((state) => state.continueCourseReducer.answers);

	const [Grade, setGrade] = useState(0);
	const [OldGrade, setOldGrade] = useState(Content.receivedGrade);
	const [MissingAnswer, setMissingAnswer] = useState(false);
	const [Solve, setSolve] = useState(false);
	const handleSubmitAnswers = async () => {
		let emptyAnswers = Answers.filter((answer) => answer.choice === "");

		if (emptyAnswers.length !== 0) {
			console.log("Select All Answers");
			setMissingAnswer(true);
		} else {
			setMissingAnswer(false);

			let userQuestions =
				user.courses[courseIndex].subtitles[SubtitleIndex].exercises[exerciseIndex].questions;
			userQuestions = userQuestions.map((question, questionIndex) => {
				return { ...question, studentAnswer: Answers[questionIndex].choice };
			});

			let maxGrade = Content.maxGrade;
			let grade = Answers.map((answer) => {
				let correctAnswer = Content.questions.find(
					(question) => question._id === answer.questionId
				).correctAnswer;
				if (correctAnswer === answer.choice) return 1;
				else return 0;
			});
			grade = grade.reduce((partialSum, a) => partialSum + a, 0);

			setGrade(grade);
			setOldGrade(Content.receivedGrade);
			let bestGrade;
			if (grade < Content.receivedGrade) {
				bestGrade = Content.receivedGrade;
			} else {
				await API.put(`/trainees/${user._id}/solveExercise`, {
					courseIndex: courseIndex,
					subtitleIndex: SubtitleIndex,
					exerciseIndex: exerciseIndex,
					questions: userQuestions,
				});
				bestGrade = grade;
			}

			dispatch(
				solveExercise({
					courseIndex: courseIndex,
					subtitleIndex: SubtitleIndex,
					exerciseIndex: exerciseIndex,
					questions: userQuestions,
					receivedGrade: bestGrade,
				})
			);
			dispatch(setIsSolved(true));
			dispatch(
				setContent({
					...Content,
					isSolved: true,
					questions: userQuestions,
					receivedGrade: bestGrade,
				})
			);
		}
	};
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
		<Col>
			<h3>{Content.title}</h3>
			{Solve && (
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
												question.correctAnswer === Answers[question_index].choice
													? "success"
													: "error"
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
									<span className={Grade >= 0.5 ? "success" : "error"}>
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
								<Button onClick={() => setSolve(false)}>Try again</Button>
							</Col>
						</>
					)}
					{MissingAnswer && (
						<h6 className="error">You have to choose an answer to each question!</h6>
					)}
					{!IsSolved && <Button onClick={handleSubmitAnswers}>Submit Answers</Button>}
				</Form>
			)}
			{!Solve && (
				<Row className="align-items-center">
					<h6 className="gradeRecieved mb-0">
						Best Received: {"   "}
						<span className={OldGrade / Content.maxGrade >= 0.5 ? "success" : "error"}>
							{Content.isSolved && ((OldGrade / Content.maxGrade) * 100).toFixed(2)}
							{!Content.isSolved && "_"}
						</span>
					</h6>
					<Col>
						<Button
							onClick={() => {
								let newAnswers = new Array(Content.questions.length);
								Content.questions.map((question, questionIndex) => {
									newAnswers[questionIndex] = { questionId: question._id, choice: "" };
								});
								dispatch(initializeAnswers(newAnswers));
								dispatch(setIsSolved(false));
								setSolve(true);
							}}>
							Start Exercise
						</Button>
					</Col>
				</Row>
			)}
		</Col>
	);
}
