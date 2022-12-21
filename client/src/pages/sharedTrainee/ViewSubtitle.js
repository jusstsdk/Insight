import { useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import YoutubeEmbed from "../../components/YoutubeEmbed";
// import SearchCourses from "../../components/SearchCourses";
// import CourseList from "../../components/shared/CourseList";

export default function ViewSubtitle() {
	const location = useLocation();

	const user = useSelector((state) => state.userReducer.user);

	const CourseId = location.state.courseId;
	const Subtitle = location.state.subtitle;

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

	const handleMarkAsWatched = () => {
		console.log(user);
		let newUserCourses = { ...user }.courses;
		let courseIndex = user.courses.findIndex((course) => course._id === CourseId);
		let subtitleIndex = user.courses[courseIndex].subtitles.findIndex(
			(subtitle) => subtitle._id === Subtitle._id
		);
		let videoIndex = user.courses[courseIndex].subtitles[subtitleIndex].videos.findIndex(
			(video) => video._id === YoutubeVideoId
		);

		let newVideo = { ...newUserCourses[courseIndex].subtitles[subtitleIndex].videos[videoIndex] };
		newVideo = {
			...newVideo,
			isWatched: true,
		};
	};

	return (
		<>
			<Table striped>
				<thead>
					<tr>
						<th>#</th>
						<th>Title</th>
						<th>Hours</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{Subtitle.videos.map((video, i) => {
						return (
							<tr key={`Subtitle_tr_${video._id}`}>
								<td>{i + 1}</td>

								<td>{video.description}</td>
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
