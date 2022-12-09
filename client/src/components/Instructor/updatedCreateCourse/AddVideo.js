import { useRef } from "react";
import { useDispatch } from "react-redux";
import { Form, Row, Col, Button } from "react-bootstrap";

import { addVideoToSubtitle } from "../../../redux/createCourseSlice";

export default function AddVideo(props) {
	const Url = useRef();
	const Description = useRef();
	const dispatch = useDispatch();

	const handleAddVideo = () => {
		let newVideo = { url: Url.current.value, description: Description.current.value };
		dispatch(addVideoToSubtitle(newVideo));
		props.setCurrentComponent("addSubtitle");
	};

	return (
		<Form.Group as={Row} className="mb-3 d-flex align-items-center justify-content-start">
			<Form.Label column sm={1}>
				Videos
			</Form.Label>
			<Col sm={2}>
				<Form.Control type="text" placeholder="Video Url" ref={Url} />
			</Col>
			<Col sm={6}>
				<Form.Control type="text" placeholder="Video Description" ref={Description} />
			</Col>
			<Button id="addSubject" onClick={handleAddVideo}>
				Add Video
			</Button>
		</Form.Group>
	);
}
