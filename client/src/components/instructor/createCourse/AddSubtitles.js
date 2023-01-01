import { useState } from "react";
import { Col, Button, Row } from "react-bootstrap";

import ViewSubtitles from "./ViewSubtitles";
import AddSubtitleInfo from "./AddSubtitleInfo";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { addNotification } from "../../../redux/notificationsSlice";
import { MdOutlineError } from "react-icons/md";

export default function AddSubtitle(props) {
	const [AddSubtitleModalShow, setAddSubtitleModalShow] = useState(false);
	const [NoSubtitles, setNoSubtitles] = useState(false);
	// const [MissingVideos, setMissingVideos] = useState(false);
	// const [MissingExcersises, setMissingExcersises] = useState(false);
	// const [ExcersisesMissingQuestions, setExcersisesMissingQuestions] = useState(false);
	const dispatch = useDispatch();
	const Subtitles = useSelector((state) => state.createCourseReducer.subtitles);
	const showErrorMessage = () => {
		dispatch(
			addNotification({
				title: "Create Course",
				info: `Please add at least one subtitle!`,
				color: "error",
			})
		);
	};
	const handleNext = () => {
		if (Subtitles.length === 0) {
			setNoSubtitles(true);
			// setMissingExcersises(false);
			// setMissingVideos(false);
			// setExcersisesMissingQuestions(false);
			showErrorMessage();
		} else {
			setNoSubtitles(false);
			let MissingVideosTemp = false;
			let MissingQuestionsTemp = false;
			if(Subtitles.some((subtitle) => subtitle.videos.length === 0)){
				// setMissingVideos(true);
				MissingVideosTemp = true;
				dispatch(
					addNotification({
						title: "Create Course",
						info: `Please add at least one video to each subtitle!`,
						color: "error",
					})
				);
			}  
			if(Subtitles.some((subtitle) => subtitle.exercises.some((exercise) => exercise.questions.length === 0))){
				// setExcersisesMissingQuestions(true);
				// setMissingExcersises(false);
				MissingQuestionsTemp = true;
				dispatch(
					addNotification({
						title: "Create Course",
						info: `Please add at least one question to each exercise!`,
						color: "error",
					})
				);
			}
			if(!(MissingQuestionsTemp || MissingVideosTemp)){
				setNoSubtitles(false);
				// setMissingVideos(false);
				// setMissingExcersises(false);
				// setExcersisesMissingQuestions(false);
				props.setCurrentTab("addExam");
			}
		}
	};

	return (
		<>
			<Row>
				<Col>
					<h1 className="fs-3 fw-semibold text-muted">Adding Course Subtitles</h1>
				</Col>
				<Col className="d-flex justify-content-end">
					{NoSubtitles && (
						<span className="error">
							You need add at least one subtitle <MdOutlineError />
						</span>
					)}
				</Col>
				<Col className="d-flex justify-content-end">
					<Button onClick={() => setAddSubtitleModalShow(true)}>Add a Subtitle</Button>
				</Col>
			</Row>
			<ViewSubtitles />

			{/* Navigation */}
			<Col className="mb-3 me-3 fixed-bottom d-flex justify-content-center">
				<Button
					className="me-3"
					onClick={() => {
						props.setCurrentTab("addInfo");
					}}>
					<AiOutlineArrowLeft />
				</Button>

				<Button
					onClick={() => {
						handleNext();
					}}>
					<AiOutlineArrowRight />
				</Button>
			</Col>
			{AddSubtitleModalShow && (
				<AddSubtitleInfo
					case="Add"
					show={AddSubtitleModalShow}
					handleClose={() => setAddSubtitleModalShow(false)}
				/>
			)}
		</>
	);
}
