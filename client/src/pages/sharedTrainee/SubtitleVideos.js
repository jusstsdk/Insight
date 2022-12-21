import { useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import YoutubeEmbed from "../../components/YoutubeEmbed";
import API from "../../functions/api";
import { watchVideo } from "../../redux/userSlice";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function SubtitleVideos(props) {
	const dispatch = useDispatch();

	const user = useSelector((state) => state.userReducer.user);

	const courseIndex = useSelector((state) => state.userReducer.user.courses).findIndex(
		(course) => course.course === props.CourseId
	);

	const Subtitle = useSelector(
		(state) => state.userReducer.user.courses[courseIndex].subtitles[props.subtitleIndex]
	);

	const [WatchYoutube, setWatchYoutube] = useState(false);
	const [YoutubeVideoId, setYoutubeVideoId] = useState();
	const [YoutubeVideoUrl, setYoutubeVideoUrl] = useState("");

	const handleWatchYoutubeClose = () => {
		setYoutubeVideoUrl("");
		setWatchYoutube(false);
	};
	const handleWatchYoutubeShow = (id, url) => {
		setYoutubeVideoId(id);
		setYoutubeVideoUrl(url);
		setWatchYoutube(true);
	};

	const handleMarkAsWatched = async () => {
		let videoIndex = user.courses[courseIndex].subtitles[props.subtitleIndex].videos.findIndex(
			(video) => video._id === YoutubeVideoId
		);
		await API.put(`/trainees/${user._id}/watchVideo`, {
			courseIndex: courseIndex,
			subtitleIndex: props.subtitleIndex,
			videoIndex: videoIndex,
		});
		dispatch(
			watchVideo({
				courseIndex: courseIndex,
				subtitleIndex: props.subtitleIndex,
				videoIndex: videoIndex,
			})
		);
		handleWatchYoutubeClose();
	};

	return (
		<>
			<h3>Videos</h3>
			<Table striped>
				<thead>
					<tr>
						<th>#</th>
						<th>Description</th>
						<th></th>
						<th>View</th>
					</tr>
				</thead>
				<tbody>
					{Subtitle.videos.map((video, i) => {
						return (
							<tr key={`Subtitle_tr_${video._id}`}>
								<td>{i + 1}</td>

								<td>{video.description}</td>
								<td>{video.isWatched ? <AiFillEye /> : <AiFillEyeInvisible />}</td>
								<td>
									<Button
										key={`Subtitle_${Subtitle._id}_Video_${video._id}_Button`}
										onClick={() => handleWatchYoutubeShow(video._id, video.url)}>
										View
									</Button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
			{WatchYoutube && (
				<Modal
					show={WatchYoutube}
					onHide={handleWatchYoutubeClose}
					size="lg"
					aria-labelledby="contained-modal-title-vcenter"
					centered>
					<Modal.Header className="bg-opacity-50" closeButton></Modal.Header>
					<Modal.Body>
						<YoutubeEmbed src={YoutubeVideoUrl} />
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={handleWatchYoutubeClose}>Close</Button>
						<Button onClick={handleMarkAsWatched}>Mark as Watched</Button>
					</Modal.Footer>
				</Modal>
			)}
		</>
	);
}
