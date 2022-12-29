import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Row, Col, Button, Modal } from "react-bootstrap";

import { addVideoToSubtitle, editVideoOfSubtitle } from "../../../redux/createCourseSlice";
import API from "../../../functions/api";
export default function AddVideo(props) {
	const dispatch = useDispatch();

	const DescriptionRef = useRef(null);
	const [Url, setUrl] = useState(props.case === "Add" ? "" : props.video.url);
	const [Title, setTitle] = useState(props.case === "Add" ? "" : props.video.title);

	const [Description, setDescription] = useState(
		props.case === "Add" ? "" : props.video.description
	);
	const [BadUrl, setBadUrl] = useState(false);
	const SubtitleKey = props.subtitleKey;
	const VideoKey = props.videoKey;
	const videoIndex = useSelector(
		(state) => state.createCourseReducer.subtitlesIndices[SubtitleKey]
	);

	const resizeTextArea = (textAreaRef) => {
		textAreaRef.current.style.height = "auto";
		textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
	};
	useEffect(() => resizeTextArea(DescriptionRef), [Description]);

	const getVideoDuration = async (url) => {
		let videoId;
		if (url.includes("watch?v=")) {
			videoId = url.split("watch?v=")[1];
		} else {
			videoId = url.split("/")[url.split("/").length - 1];
		}
		console.log(videoId);
		// videoId = videoId[videoId.length - 1].split("watch?v=")[1];
		let response = await API.get(
			`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=AIzaSyBEiJPdUdU5tpzqmYs7h-RPt6J8VoXeyyY`
		);
		console.log(response);

		if (response.data.items.length === 0) {
			setBadUrl(true);
			return;
		} else setBadUrl(false);
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
	const handleAddVideo = async () => {
		let totalSeconds = await getVideoDuration(Url);

		if (props.case === "Add") {
			let newVideo = { title: Title, url: Url, description: Description, index: videoIndex };
			dispatch(
				addVideoToSubtitle({
					subtitleKey: SubtitleKey,
					video: newVideo,
					seconds: totalSeconds,
				})
			);
		} else {
			let oldTotalSeconds = await getVideoDuration(props.video.url);
			let newVideo = {
				title: Title,
				url: Url,
				description: Description,
				index: videoIndex - 1,
			};

			dispatch(
				editVideoOfSubtitle({
					subtitleKey: props.subtitleKey,
					videoKey: VideoKey,
					video: newVideo,
					oldSeconds: oldTotalSeconds,
					seconds: totalSeconds,
				})
			);
		}
		setUrl("");
		setDescription("");
		setTitle("");
		props.handleClose();
	};

	return (
		<Modal
			show={props.show}
			onHide={props.handleClose}
			backdrop="static"
			keyboard={false}
			size="xl"
			dialogClassName="modal-90w"
			aria-labelledby="example-custom-modal-styling-title"
			centered>
			<Modal.Header closeButton>
				<Modal.Title id="example-custom-modal-styling-title">
					{props.case === "Add" ? "Adding" : "Editting"} a Video
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form.Group className="mb-3 d-flex align-items-center justify-content-start">
					<Col>
						<Row className="justify-content-center">
							<Form.Label column sm={1}>
								Title
							</Form.Label>
							<Col sm={5}>
								<Form.Control
									type="text"
									placeholder="Video Title"
									value={Title}
									onChange={(e) => setTitle(e.target.value)}
								/>
							</Col>
							<Form.Label column sm={1}>
								Url
							</Form.Label>
							<Col sm={4}>
								<Form.Control
									type="text"
									placeholder="Video Url"
									value={Url}
									onChange={(e) => setUrl(e.target.value)}
								/>
								{BadUrl && <h6 className="error">The Url doesn't exist!</h6>}
							</Col>
						</Row>
						<Row className="mt-3 justify-content-center">
							<Form.Label column sm={1}>
								Description
							</Form.Label>
							<Col sm={10}>
								<Form.Control
									ref={DescriptionRef}
									type="text"
									as="textarea"
									rows={2}
									placeholder="Video Description"
									value={Description}
									onChange={(e) => setDescription(e.target.value)}
								/>
							</Col>
						</Row>
					</Col>
				</Form.Group>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={props.handleClose}>
					Close
				</Button>
				<Button id="addSubject" onClick={handleAddVideo}>
					{props.case} Video
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
