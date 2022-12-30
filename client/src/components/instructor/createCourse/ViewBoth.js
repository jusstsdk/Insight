import { useDispatch } from "react-redux";
import { Button, Accordion, Col, Row } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import QuizIcon from "@mui/icons-material/Quiz";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import {
	addQuestionToExercise,
	editQuestionOfExercise,
	removeQuestionFromExercise,
	removeExerciseFromSubtitle,
	removeVideoFromSubtitle,
} from "../../../redux/createCourseSlice";

import ViewExercise from "./ViewExercise";
import AddExercise from "./AddExercise";
import { useState } from "react";
import AddQuestion from "./AddQuestion";

import AddVideo from "./AddVideo";
import API from "../../../functions/api";
export default function ViewBoth(props) {
	const dispatch = useDispatch();

	const SubtitleKey = props.subtitleKey;

	const [Exercise, setExercise] = useState({});
	const [ExerciseKey, setExerciseKey] = useState();

	const [ShowAddExerciseModal, setShowAddExerciseModal] = useState(false);
	const handleAddExerciseModalClose = () => setShowAddExerciseModal(false);
	const handleAddExerciseModalShow = () => {
		props.setSubtitle(props.subtitle);
		props.setSubtitlekey(props.subtitle_key);
		setShowAddExerciseModal(true);
	};

	const [ShowEditExerciseModal, setShowEditExerciseModal] = useState(false);
	const handleEditExerciseModalClose = () => setShowEditExerciseModal(false);
	const handleEditExerciseModalShow = (exercise, exercise_key) => {
		setExercise(exercise);
		setExerciseKey(exercise_key);
		setShowEditExerciseModal(true);
	};

	const [ShowAddQuestionModal, setShowAddQuestionModal] = useState(false);
	const handleAddQuestionModalClose = () => setShowAddQuestionModal(false);
	const handleAddQuestionModalShow = (exercise, exercise_key) => {
		setExercise(exercise);
		setExerciseKey(exercise_key);
		setShowAddQuestionModal(true);
	};

	const handleDeleteExercise = (exercise_key) => {
		let exerciseIndex = props.SubtitleExercises[exercise_key].index;
		let numberOfQuestions = props.SubtitleExercises[exercise_key].questions.length;

		let newExercises = props.SubtitleExercises.filter((_, i) => i !== exercise_key);
		dispatch(
			removeExerciseFromSubtitle({
				subtitleKey: props.subtitleKey,
				newExercises: newExercises,
				exerciseIndex: exerciseIndex,
				numberOfQuestions: numberOfQuestions,
			})
		);
	};

	const handleAddQuestion = (newQuestion) => {
		dispatch(
			addQuestionToExercise({
				subtitleKey: props.subtitleKey,
				exerciseKey: ExerciseKey,
				question: newQuestion,
			})
		);
	};
	const handleEditQuestion = (exercise_key, question_key, newQuestion) => {
		dispatch(
			editQuestionOfExercise({
				subtitleKey: props.subtitleKey,
				exerciseKey: exercise_key,
				questionKey: question_key,
				question: newQuestion,
			})
		);
	};

	const handleDeleteQuestion = (question_key, exercise_key) => {
		let newQuestions = props.SubtitleExercises[exercise_key].questions.filter(
			(question, i) => i !== question_key
		);
		dispatch(
			removeQuestionFromExercise({
				subtitleKey: props.subtitleKey,
				exerciseKey: exercise_key,
				newQuestions: newQuestions,
			})
		);
	};

	const [Video, setVideo] = useState(props.video);
	const [VideoKey, setVideoKey] = useState(props.video);

	const [ShowAddVideoModal, setShowAddVideoModal] = useState(false);
	const handleAddVideoModalClose = () => setShowAddVideoModal(false);
	const handleAddVideoModalShow = (subtitle, subtitle_key) => {
		props.setSubtitle(subtitle);
		props.setSubtitlekey(subtitle_key);
		setShowAddVideoModal(true);
	};

	const [ShowEditVideoModal, setShowEditVideoModal] = useState(false);
	const handleEditVideoModalClose = () => setShowEditVideoModal(false);
	const handleEditVideoModalShow = (video, video_key) => {
		setVideo(video);
		setVideoKey(video_key);
		setShowEditVideoModal(true);
	};
	const getVideoDuration = async (url) => {
		let videoId;
		if (url.includes("watch?v=")) {
			videoId = url.split("watch?v=")[1];
		} else {
			videoId = url.split("/")[url.split("/").length - 1];
		}
		// videoId = videoId[videoId.length - 1].split("watch?v=")[1];
		let response = await API.get(
			`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=AIzaSyBEiJPdUdU5tpzqmYs7h-RPt6J8VoXeyyY`
		);

		let videoDuration = response.data.items[0].contentDetails.duration;
		var reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
		var hours = 0,
			minutes = 0,
			seconds = 0,
			totalseconds;

		if (reptms.test(videoDuration)) {
			var matches = reptms.exec(videoDuration);
			if (matches[1]) hours = Number(matches[1]);
			if (matches[2]) minutes = Number(matches[2]);
			if (matches[3]) seconds = Number(matches[3]);
			totalseconds = hours * 3600 + minutes * 60 + seconds;
		}
		return totalseconds;
	};
	const handleDeleteVideo = async (video_key) => {
		let oldTotalSeconds = await getVideoDuration(props.SubtitleVideos[video_key].url);

		let newVideos = props.SubtitleVideos.filter((_, i) => i !== video_key);
		let videoIndex = props.SubtitleVideos[video_key].index;
		dispatch(
			removeVideoFromSubtitle({
				subtitleKey: props.subtitleKey,
				newVideos: newVideos,
				videoIndex: videoIndex,
				oldSeconds: oldTotalSeconds,
			})
		);
	};

	const getContentIndex = (content) => {
		let index;
		if (content.type === "Video") {
			index = props.SubtitleVideos.findIndex((video) => video.index === content.index);
		} else {
			index = props.SubtitleExercises.findIndex((exercise) => exercise.index === content.index);
		}
		return index;
	};
	const combineContent = () => {
		let videos = props.SubtitleVideos.map((video) => ({ ...video, type: "Video" }));
		let exercises = props.SubtitleExercises.map((exercise) => ({ ...exercise, type: "Exercise" }));
		let content = [...videos, ...exercises].sort((a, b) =>
			a.index > b.index ? 1 : b.index > a.index ? -1 : 0
		);
		return content;
		// let exercises = subtitle.videos;
	};
	return (
		<>
			<Accordion key={`subtitle_${SubtitleKey}`}>
				{combineContent().map((content, content_index) => (
					<>
						{content.type === "Exercise" && (
							<Accordion.Item
								eventKey={`exercise_${getContentIndex(content)}`}
								key={`exercise_${getContentIndex(content)}`}>
								<div className="d-flex">
									<Col sm={11} className="me-auto">
										<Accordion.Header className="accordionHeaderWidth">
											<QuizIcon />
											<h6 className="mb-0 ms-2">{content.title}</h6>
										</Accordion.Header>
									</Col>
									<Col sm={1} className="d-flex justify-content-end">
										<Button
											variant="success"
											className="accordionTrash accordionLikeEditButton"
											key={`exercise_edit_button_${getContentIndex(content)}`}
											onClick={() =>
												handleEditExerciseModalShow(content, getContentIndex(content))
											}>
											<AiOutlineEdit key={"exercise_edit_" + getContentIndex(content)} />
										</Button>
										<Button
											className="accordionTrash accordionLikeDeleteButton"
											variant="danger"
											key={`exercise_trash_button_${getContentIndex(content)}`}
											onClick={() => handleDeleteExercise(getContentIndex(content))}>
											<BsTrash key={"exercise_trash_" + getContentIndex(content)} />
										</Button>
									</Col>
								</div>
								<Accordion.Body>
									<Accordion>
										<Col>
											<ViewExercise
												case="Exercise"
												key={`view_exercise_questions_${getContentIndex(content)}`}
												Questions={content.questions}
												handleAddQuestion={handleEditQuestion}
												exerciseKey={getContentIndex(content)}
												handleDeleteQuestion={handleDeleteQuestion}
											/>
										</Col>
										<Col className=" d-flex">
											<Button
												onClick={() =>
													handleAddQuestionModalShow(content, getContentIndex(content))
												}
												className="me-1 m-auto">
												Add Question
											</Button>
										</Col>
									</Accordion>
								</Accordion.Body>
							</Accordion.Item>
						)}
						{content.type === "Video" && (
							<Accordion.Item
								eventKey={`video_${getContentIndex(content)}`}
								key={`video_${getContentIndex(content)}`}>
								<div className="d-flex">
									<Col sm={11} className="me-auto">
										<Accordion.Header className="accordionHeaderWidth">
											<OndemandVideoIcon />
											<h6 className="mb-0 ms-2">{content.title}</h6>
										</Accordion.Header>
									</Col>
									<Col sm={1} className="d-flex justify-content-end">
										<Button
											variant="success"
											className="accordionTrash accordionLikeEditButton"
											key={`video_edit_button_${getContentIndex(content)}`}
											onClick={() => handleEditVideoModalShow(content, getContentIndex(content))}>
											<AiOutlineEdit key={`video_edit_${getContentIndex(content)}`} />
										</Button>
										<Button
											className="accordionTrash accordionLikeDeleteButton"
											variant="danger"
											key={`video_trash_button_${getContentIndex(content)}`}
											onClick={async () =>
												await handleDeleteVideo(getContentIndex(content, content_index))
											}>
											<BsTrash key={"video_trash_" + getContentIndex(content)} />
										</Button>
									</Col>
								</div>
								<Accordion.Body>
									<h6 className="videoUrl mb-2">{content.url}</h6>

									<p>{content.description}</p>
								</Accordion.Body>
							</Accordion.Item>
						)}
					</>
				))}
			</Accordion>

			<Row className="mt-3 me-auto justify-content-end">
				<Button
					onClick={() => handleAddExerciseModalShow(props.subtitle, props.subtitle_key)}
					className="me-3 w-auto">
					Add Exercise
				</Button>
				<Button
					onClick={() => handleAddVideoModalShow(props.subtitle, props.subtitleKey)}
					className=" w-auto">
					Add Video
				</Button>
			</Row>

			{ShowAddExerciseModal && (
				<AddExercise
					case="Add"
					subtitle={props.subtitle}
					subtitleKey={props.subtitleKey}
					show={ShowAddExerciseModal}
					handleClose={handleAddExerciseModalClose}
				/>
			)}
			{ShowEditExerciseModal && (
				<AddExercise
					case="Edit"
					exercise={Exercise}
					exerciseKey={ExerciseKey}
					subtitleKey={SubtitleKey}
					show={ShowEditExerciseModal}
					handleClose={handleEditExerciseModalClose}
				/>
			)}
			{ShowAddQuestionModal && (
				<AddQuestion
					case="Add"
					exercise={Exercise}
					exerciseKey={ExerciseKey}
					subtitleKey={SubtitleKey}
					show={ShowAddQuestionModal}
					handleClose={handleAddQuestionModalClose}
					handleAddQuestion={handleAddQuestion}
				/>
			)}

			{ShowAddVideoModal && (
				<AddVideo
					case="Add"
					subtitle={props.subtitle}
					subtitleKey={props.subtitleKey}
					show={ShowAddVideoModal}
					handleClose={handleAddVideoModalClose}
				/>
			)}
			{ShowEditVideoModal && (
				<AddVideo
					case="Edit"
					video={Video}
					videoKey={VideoKey}
					subtitleKey={props.subtitleKey}
					show={ShowEditVideoModal}
					handleClose={handleEditVideoModalClose}
				/>
			)}
		</>
	);
}
