import { Button, Col, Form, ListGroupItem, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import API from "../../functions/api";
import { setUser, solveExercise } from "../../redux/userSlice";
import { useState } from "react";
import { setContent, updateAnswer } from "../../redux/continueCourseSlice";
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
	const [Answers, setAnswers] = useState(
		new Array(Content.questions.length).fill({ questionIndex: -1, choice: "" })
	);

	const [IsSolved, setIsSolved] = useState(false);
	const [Grade, setGrade] = useState(-1);
	const [MissingAnswer, setMissingAnswer] = useState(false);

	const handleMarkAsWatched = async () => {
		let response = await API.put(`/trainees/${user._id}/watchVideo`, {
			courseIndex: courseIndex,
			subtitleIndex: SubtitleIndex,
			videoIndex: exerciseIndex,
		});
		dispatch(setUser(response.data));
		dispatch(setContent({ ...Content, isWatched: true }));
	};

	const handleSubmitAnswers = async () => {
		let emptyAnswers = Answers.filter((answer) => answer.choice === "");

		if (emptyAnswers.length !== 0) {
			console.log("Select All Answers");
			setMissingAnswer(true);
		} else {
			setMissingAnswer(false);
			setIsSolved(true);
			let grade = Answers.map((answer) => {
				let correctAnswer = Content.questions.find(
					(question) => question._id === answer.questionId
				).correctAnswer;
				if (correctAnswer === answer.choice) return 1;
				else return 0;
			});
			grade = grade.reduce((partialSum, a) => partialSum + a, 0);
			setGrade(grade);
			let userQuestions =
				user.courses[courseIndex].subtitles[SubtitleIndex].exercises[exerciseIndex].questions;
			userQuestions = userQuestions.map((question, questionIndex) => {
				return { ...question, studentAnswer: Answers[questionIndex].choice };
			});
			await API.put(`/trainees/${user._id}/solveExercise`, {
				courseIndex: courseIndex,
				subtitleIndex: SubtitleIndex,
				exerciseIndex: exerciseIndex,
				questions: userQuestions,
			});
			dispatch(
				solveExercise({
					courseIndex: courseIndex,
					subtitleIndex: SubtitleIndex,
					exerciseIndex: exerciseIndex,
					questions: userQuestions,
					receivedGrade: grade,
				})
			);
			dispatch(setContent({ ...Content, isSolved: true, questions: userQuestions }));
		}
	};
	const handleChoiceClick = (questionIndex, questionId, choice) => {
		// let newAnswers = [...Answers];
		// newAnswers[question_index] = {
		// 	questionIndex: questionIndex,
		// 	questionId: questionId,
		// 	choice: choice,
		// };
		// setAnswers(newAnswers);
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
					<Col className="ms-auto" sm={3}>
						<h6>
							Grade Recieved:{" "}
							<span
								className={(Grade / Content.questions.length) * 100 >= 50 ? "success" : "error"}>
								{((Grade / Content.questions.length) * 100).toFixed(2)}
							</span>
						</h6>
					</Col>
				)}
				{MissingAnswer && <h6 className="error">You have to choose an answer to each question!</h6>}
				{!IsSolved && <Button onClick={handleSubmitAnswers}>Submit Answers</Button>}
			</Form>
		</Col>
	);
}
