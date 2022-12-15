import { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Row, Col, Button, Modal } from "react-bootstrap";

import { addVideoToSubtitle, editVideoOfSubtitle } from "../../../redux/createCourseSlice";

export default function AddVideo(props) {
	const dispatch = useDispatch();

	const [Url, setUrl] = useState(props.case === "Add" ? "" : props.video.url);
	const [Description, setDescription] = useState(
		props.case === "Add" ? "" : props.video.description
	);
	const SubtitleKey = props.subtitleKey;
	const VideoKey = props.videoKey;

	const handleAddVideo = () => {
		let newVideo = { url: Url, description: Description };
		if (props.case === "Add") {
			dispatch(addVideoToSubtitle({ subtitleKey: SubtitleKey, video: newVideo }));
		} else {
			dispatch(
				editVideoOfSubtitle({ subtitleKey: props.subtitleKey, videoKey: VideoKey, video: newVideo })
			);
		}
		setUrl("");
		setDescription("");
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
				<Modal.Title id="example-custom-modal-styling-title">Adding a Subtitle</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form.Group as={Row} className="mb-3 d-flex align-items-center justify-content-start">
					<Form.Label column sm={1}>
						Videos
					</Form.Label>
					<Col sm={2}>
						<Form.Control
							type="text"
							placeholder="Video Url"
							value={Url}
							onChange={(e) => setUrl(e.target.value)}
						/>
					</Col>
					<Col sm={6}>
						<Form.Control
							type="text"
							placeholder="Video Description"
							value={Description}
							onChange={(e) => setDescription(e.target.value)}
						/>
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
