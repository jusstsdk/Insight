import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Accordion, Card, Col } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";

import { removeVideoFromSubtitle } from "../../../redux/createCourseSlice";

import AddVideo from "./AddVideo";

export default function ViewVideos(props) {
	const dispatch = useDispatch();
	const [Video, setVideo] = useState(props.video);
	const [VideoKey, setVideoKey] = useState(props.video);
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
				{props.SubtitleVideos.map((video, video_key) => {
					return (
						<Accordion.Item eventKey={`video_${video_key}`} key={`video_${video_key}`}>
							<div className="d-flex">
								<Accordion.Header className="accordionHeaderWidth">
									<h6>{video.url}</h6>
								</Accordion.Header>
								<Button
									className="accordionTrash"
									key={`video_trash_button_${video_key}`}
									onClick={() => handleDeleteVideo(video_key)}>
									<BsTrash key={"video_trash_" + video_key} className="trashIcon" />
								</Button>
								<Button
									className="accordionTrash"
									key={`video_edit_button_${video_key}`}
									onClick={() => handleEditVideoModalShow(video, video_key)}>
									<AiOutlineEdit key={"video_edit_" + video_key} className="trashIcon" />
								</Button>
							</div>
							<Accordion.Body>{video.description}</Accordion.Body>
						</Accordion.Item>
					);
				})}
			</Accordion>
			{props.SubtitleVideos.map((video, video_key) => {
				return (
					<Card key={`video_${video_key}`}>
						<div className="d-flex">
							<Card.Header className="accordionHeaderWidth accordionLikeHeader d-flex align-items-center">
								<Col sm={9} className="me-auto">
									<h6 className="videoUrl">{video.url}</h6>
								</Col>
								<Col sm={1} className="d-flex">
									<Button
										className="accordionTrash"
										key={`video_trash_button_${video_key}`}
										onClick={() => handleDeleteVideo(video_key)}>
										<BsTrash key={"video_trash_" + video_key} className="trashIcon" />
									</Button>

									<Button
										className="accordionTrash"
										key={`video_edit_button_${video_key}`}
										onClick={() => handleEditVideoModalShow(video, video_key)}>
										<AiOutlineEdit key={"video_edit_" + video_key} className="trashIcon" />
									</Button>
								</Col>
							</Card.Header>
						</div>
						<Card.Body>{video.description}</Card.Body>
					</Card>
				);
			})}
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
