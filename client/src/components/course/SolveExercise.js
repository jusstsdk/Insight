import { Button, Col, Form, ListGroupItem, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import API from "../../functions/api";
import { setUser, solveExercise } from "../../redux/userSlice";
import { useState } from "react";
import {
	initializeAnswers,
	setContent,
	setGrade,
	setIsSolved,
	setOldGrade,
	setSolve,
	updateAnswer,
} from "../../redux/continueCourseSlice";
import ExerciseBody from "./ExerciseBody";
export default function SolveExercise(props) {
	// Data Setup
	const dispatch = useDispatch();
	const user = useSelector((state) => state.userReducer.user);

	//  Incoming Info
	const Content = useSelector((state) => state.continueCourseReducer.content);
	const courseIndex = useSelector((state) => state.userReducer.user.courses).findIndex(
		(course) => course.course === props.CourseId
	);
	const SubtitleIndex = useSelector((state) => state.continueCourseReducer.subtitleIndex);
	const exerciseIndex = user.courses[courseIndex].subtitles[SubtitleIndex].exercises.findIndex(
		(video) => video._id === Content._id
	);

	//  Page Control
	const Solve = useSelector((state) => state.continueCourseReducer.solve);
	const [MissingAnswer, setMissingAnswer] = useState(false);
	const IsSolved = useSelector((state) => state.continueCourseReducer.isSolved);
	const Answers = useSelector((state) => state.continueCourseReducer.answers);
	const Grade = useSelector((state) => state.continueCourseReducer.grade);
	const OldGrade = useSelector((state) => state.continueCourseReducer.oldGrade);

	const handleSubmitAnswers = async () => {
		let emptyAnswers = Answers.filter((answer) => answer.choice === "");

		if (emptyAnswers.length !== 0) setMissingAnswer(true);
		else {
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

			dispatch(setGrade(grade));
			dispatch(setOldGrade(Content.receivedGrade));
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

	return (
		<Col>
			<h3>{Content.title}</h3>
			{Solve && (
				<ExerciseBody
					MissingAnswer={MissingAnswer}
					Grade={Grade}
					OldGrade={OldGrade}
					handleSubmitAnswers={handleSubmitAnswers}
				/>
			)}
			{!Solve && (
				<Row className="align-items-center">
					<h6 className="gradeRecieved mb-0">
						Best Received: {"   "}
						<span>
							{Content.isSolved && ((OldGrade / Content.maxGrade) * 100).toFixed(2)}
							{!Content.isSolved && "-"}
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
								dispatch(setSolve(true));
							}}>
							Start Exercise
						</Button>
					</Col>
				</Row>
			)}
		</Col>
	);
}
