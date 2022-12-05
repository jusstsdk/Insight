import { useRef } from "react";
import { Form, Row, Col, Button, ListGroup } from "react-bootstrap";
import "../../css/createCourse.css";
import TrashIcon from "../TrashIcon";
function AddVideo(props) {
	const Url = useRef();
	const Description = useRef();

	const handleAddVideo = () => {
		let newVideos = { url: Url.current.value, description: Description.current.value };
		console.log(newVideos);
		props.setVideos((videos) => [...videos, newVideos]);
		Url.current.value = "";
		Description.current.value = "";
	};
	const handleDeleteVideo = (key) => {
		let newVideos = props.Videos.filter((video, i) => i !== key);
		props.setVideos(newVideos);
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
			{/* <Col className="overflow-auto">
				<ListGroup horizontal sm={7} className="flex-wrap">
					{props.Videos.map((video, key) => (
						<ListGroup.Item
							key={key}
							as="li"
							className="d-flex justify-content-between align-items-center">
							<div>
								<h1>{video.url}</h1>
								<h1>{video.description}</h1>
							</div>

							<Button key={key} className="trashButton" onClick={() => handleDeleteVideo(key)}>
								<TrashIcon key={key} />
							</Button>
						</ListGroup.Item>
					))}
				</ListGroup>
			</Col> */}
		</Form.Group>
	);
}

export default AddVideo;
