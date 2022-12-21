import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Accordion, Card, Col, Badge } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";

import { removeVideoFromSubtitle } from "../../../redux/createCourseSlice";

import AddVideo from "./AddVideo";

export default function ViewVideos(props) {
	const dispatch = useDispatch();
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
	const handleDeleteVideo = (video_key) => {
		let newVideos = props.SubtitleVideos.filter((_, i) => i !== video_key);
		dispatch(
			removeVideoFromSubtitle({
				subtitleKey: props.subtitleKey,
				newVideos: newVideos,
			})
		);
	};

	return (
		<>
			<Accordion>
				<Accordion.Item
					eventKey={`subtitle_${props.subtitleKey}_videos`}
					key={`subtitle_${props.subtitleKey}_videos`}>
					<Accordion.Header className="accordionHeaderWidth">
						<h6>Videos</h6>
						<Col className="d-flex justify-content-end me-3">
							<Badge bg="primary" pill>
								{props.SubtitleVideos.length}
							</Badge>
						</Col>
					</Accordion.Header>
					<Accordion.Body>
						{props.SubtitleVideos.map((video, video_key) => {
							return (
								<Card key={`video_${video_key}`} className="mb-2">
									<div className="d-flex">
										<Col sm={11} className="me-auto">
											<Card.Header className="accordionHeaderWidth accordionLikeHeader d-flex align-items-center">
												<h6 className="videoUrl">{video.url}</h6>
											</Card.Header>
										</Col>
										<Col sm={1} className="d-flex justify-content-end">
											<Button
												variant="success"
												className="accordionTrash accordionLikeEditButton"
												key={`video_edit_button_${video_key}`}
												onClick={() => handleEditVideoModalShow(video, video_key)}>
												<AiOutlineEdit key={"video_edit_" + video_key} />
											</Button>
											<Button
												className="accordionTrash accordionLikeDeleteButton"
												variant="danger"
												key={`video_trash_button_${video_key}`}
												onClick={() => handleDeleteVideo(video_key)}>
												<BsTrash key={"video_trash_" + video_key} />
											</Button>
										</Col>
									</div>
									<Card.Body>{video.description}</Card.Body>
								</Card>
							);
						})}
						<Col className="mt-2">
							<Button onClick={() => handleAddVideoModalShow(props.subtitle, props.subtitleKey)}>
								Add Video
							</Button>
						</Col>
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
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
