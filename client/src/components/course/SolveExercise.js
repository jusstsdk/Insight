import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import API from "../../functions/api";
import { solveExam, solveExercise } from "../../redux/userSlice";
import { useState } from "react";
import {
	initializeAnswers,
	setContent,
	setGrade,
	setIsSolved,
	setOldGrade,
	setSolve,
} from "../../redux/continueCourseSlice";
import ExerciseBody from "./ExerciseBody";
export default function SolveExercise(props) {
	// Data Setup
	const dispatch = useDispatch();
	const user = useSelector((state) => state.userReducer.user);

	//  Incoming Info
	const Content = useSelector((state) => state.continueCourseReducer.content);
	const ContentType = useSelector((state) => state.continueCourseReducer.contentType);

	const courseIndex = useSelector((state) => state.userReducer.user.courses).findIndex(
		(course) => course.course === props.CourseId
	);
	const SubtitleIndex = useSelector((state) => state.continueCourseReducer.subtitleIndex);
	const exerciseIndex =
		ContentType === "Exercise"
			? user.courses[courseIndex].subtitles[SubtitleIndex].exercises.findIndex(
					(video) => video._id === Content._id
			  )
			: -1;

	//  Page Control
	const Solve = useSelector((state) => state.continueCourseReducer.solve);
	const [MissingAnswer, setMissingAnswer] = useState(false);
	const Answers = useSelector((state) => state.continueCourseReducer.answers);
	const Grade = useSelector((state) => state.continueCourseReducer.grade);
	const OldGrade = useSelector((state) => state.continueCourseReducer.oldGrade);

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
			if (ContentType === "Exercise") {
				await API.put(`/trainees/${user._id}/solveExercise`, {
					courseIndex: courseIndex,
					subtitleIndex: SubtitleIndex,
					exerciseIndex: exerciseIndex,
					questions: userQuestions,
				});
			} else {
				await API.put(`/trainees/${user._id}/solveExam`, {
					courseIndex: courseIndex,
					questions: userQuestions,
				});
			}
			bestGrade = grade;
		}
		if (ContentType === "Exercise") {
			dispatch(
				solveExercise({
					courseIndex: courseIndex,
					subtitleIndex: SubtitleIndex,
					exerciseIndex: exerciseIndex,
					questions: userQuestions,
					receivedGrade: bestGrade,
				})
			);
		} else {
			dispatch(
				solveExam({
					courseIndex: courseIndex,
					questions: userQuestions,
					receivedGrade: bestGrade,
				})
			);
		}

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
					<h6 className="fitWidth mb-0">
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
							Start {ContentType}
						</Button>
						{ContentType === "Exam" && Content.receivedGrade / Content.maxGrade >= 0.5 && (
							<Button className="fitWidth">Get Certificate</Button>
						)}
					</Col>
				</Row>
			)}
		</Col>
	);
}
