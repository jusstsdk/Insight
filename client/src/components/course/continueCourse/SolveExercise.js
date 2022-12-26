import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Row } from "react-bootstrap";
import {
	initializeAnswers,
	setContent,
	setGrade,
	setIsSolved,
	setOldGrade,
	setSolve,
} from "../../../redux/continueCourseSlice";
import { solveExam, solveExercise } from "../../../redux/userSlice";
import ExerciseBody from "./ExerciseBody";
import API from "../../../functions/api";
export default function SolveExercise(props) {
	// Setup
	const dispatch = useDispatch();

	// Data Setup
	const User = useSelector((state) => state.userReducer.user);
	const Content = useSelector((state) => state.continueCourseReducer.content);
	const ContentType = useSelector((state) => state.continueCourseReducer.contentType);
	const CourseIndex = useSelector((state) => state.userReducer.user.courses).findIndex(
		(course) => course.course === props.CourseId
	);
	const SubtitleIndex = useSelector((state) => state.continueCourseReducer.subtitleIndex);
	const ExerciseIndex =
		ContentType === "Exercise"
			? User.courses[CourseIndex].subtitles[SubtitleIndex].exercises.findIndex(
					(video) => video._id === Content._id
			  )
			: -1;

	//  Page Control
	const Solve = useSelector((state) => state.continueCourseReducer.solve);
	const [MissingAnswer, setMissingAnswer] = useState(false);
	const Answers = useSelector((state) => state.continueCourseReducer.answers);
	const Grade = useSelector((state) => state.continueCourseReducer.grade);
	const OldGrade = useSelector((state) => state.continueCourseReducer.oldGrade);

	// Updates Exercise in Database, User and Content.

	const handleSubmitAnswers = async () => {
		// Checks if there are empty answers.
		let emptyAnswers = Answers.filter((answer) => answer.choice === "");
		if (emptyAnswers.length !== 0) {
			setMissingAnswer(true);
			return;
		}
		setMissingAnswer(false);

		// Updates a copy of the exercise questions with the answers the user selected.
		let userQuestions = Content.questions.map((question, questionIndex) => {
			return { ...question, studentAnswer: Answers[questionIndex].choice };
		});

		// Gets array of 0s and 1s where 0s represent wrong answer and 1s correct wrong answer.
		let grade = Answers.map((answer) => {
			let correctAnswer = Content.questions.find(
				(question) => question._id === answer.questionId
			).correctAnswer;
			if (correctAnswer === answer.choice) return 1;
			else return 0;
		});

		// Sums up the array to get total received grade.
		grade = grade.reduce((partialSum, a) => partialSum + a, 0);

		dispatch(setGrade(grade));
		dispatch(setOldGrade(Content.receivedGrade));

		// If the oldGrade is better then it doesn't update the DB and keeps the best grade so far.
		let bestGrade;
		if (grade < Content.receivedGrade) {
			bestGrade = Content.receivedGrade;
		} else {
			// Updates Exercise in Database.
			if (ContentType === "Exercise") {
				await API.put(`/courses/${User._id}/solveExercise`, {
					courseIndex: CourseIndex,
					subtitleIndex: SubtitleIndex,
					exerciseIndex: ExerciseIndex,
					questions: userQuestions,
				});
			} else {
				await API.put(`/courses/${User._id}/solveExam`, {
					courseIndex: CourseIndex,
					questions: userQuestions,
				});
			}
			bestGrade = grade;
		}
		// Updates Exercise in User.
		if (ContentType === "Exercise") {
			dispatch(
				solveExercise({
					courseIndex: CourseIndex,
					subtitleIndex: SubtitleIndex,
					exerciseIndex: ExerciseIndex,
					questions: userQuestions,
					receivedGrade: bestGrade,
				})
			);
		} else {
			dispatch(
				solveExam({
					courseIndex: CourseIndex,
					questions: userQuestions,
					receivedGrade: bestGrade,
				})
			);
		}
		// Updates Exercise in Control.
		dispatch(setIsSolved(true));
		dispatch(
			setContent({
				...Content,
				isSolved: true,
				questions: userQuestions,
				receivedGrade: bestGrade,
			})
		);
	};

	return (
		<Col>
			<h3 className="mb-4">{Content.title}</h3>
			{/* Display Exercise on Start */}
			{Solve && (
				<ExerciseBody
					MissingAnswer={MissingAnswer}
					Grade={Grade}
					OldGrade={OldGrade}
					handleSubmitAnswers={handleSubmitAnswers}
				/>
			)}
			{/* Display Start Exercise and Old Grade */}
			{!Solve && (
				<Row className="align-items-center">
					{/* Old Grade */}
					<h6 className="fitWidth mb-0">
						Best Received: {"   "}
						<span>
							{Content.isSolved && ((OldGrade / Content.maxGrade) * 100).toFixed(2)}
							{!Content.isSolved && "-"}
						</span>
					</h6>
					{/* Start Exercise */}
					<Col>
						<Button
							onClick={() => {
								// Setup for Solving the Exercise
								let newAnswers = new Array(Content.questions.length);
								Content.questions.map((question, questionIndex) => {
									newAnswers[questionIndex] = { questionId: question._id, choice: "" };
								});
								dispatch(initializeAnswers(newAnswers));
								dispatch(setIsSolved(false));
								dispatch(setSolve(true));
							}}>
							Start {ContentType}
						</Button>
					</Col>
				</Row>
			)}
		</Col>
	);
}
