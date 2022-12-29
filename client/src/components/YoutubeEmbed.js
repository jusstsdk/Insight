import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import YouTube from "react-youtube";
import { watchVideo } from "../redux/userSlice";
import { setContent, setContentWatched } from "../redux/continueCourseSlice";
import { addNotification } from "../redux/notificationsSlice";
import { useDispatch, useSelector } from "react-redux";
import API from "../functions/api";
const YoutubeEmbed = ({ src, CourseId, CourseTitle }) => {
	const dispatch = useDispatch();
	let videoUrl = src.split("/");
	let videoId = videoUrl[videoUrl.length - 1];
	const User = useSelector((state) => state.userReducer.user);
	const UserType = useSelector((state) => state.userReducer.type);
	const Content = useSelector((state) => state.continueCourseReducer.content);
	const SubtitleIndex = useSelector((state) => state.continueCourseReducer.subtitleIndex);
	const CourseIndex = useSelector((state) => state.userReducer.user.courses).findIndex(
		(course) => course._id === CourseId
	);
	const VideoIndex = User.courses[CourseIndex].subtitles[SubtitleIndex].videos.findIndex(
		(video) => video._id === Content._id
	);
	const [Player, setPlayer] = useState(0);
	// Updates the status of the Video in Database, User and current Content.
	const handleMarkAsWatched = async () => {
		// Updates Video status in Database.
		let response = await API.put(`/courses/${User._id}/watchVideo`, {
			courseIndex: CourseIndex,
			subtitleIndex: SubtitleIndex,
			videoIndex: VideoIndex,
			userType: UserType,
		});

		// Send the Certificate in a mail if the User completed the Course.
		let progress = response.data.courses[CourseIndex].progress;
		if (progress === 1) {
			await API.post(`/courses/sendCertificate`, {
				courseTitle: CourseTitle,
				email: User.email,
			});
			dispatch(
				addNotification({
					title: "Continue Course",
					info: "You have completed the Course! We have sent to you your Certificate.",
					color: "success",
				})
			);
		}
		dispatch(
			addNotification({
				title: "Continue Course",
				info: "You have watched this video!",
				color: "success",
			})
		);

		// Updates Video status in UserReducer.
		dispatch(
			watchVideo({
				courseIndex: CourseIndex,
				subtitleIndex: SubtitleIndex,
				videoIndex: VideoIndex,
				progress: progress,
			})
		);

		// Updates Current Content
		dispatch(setContentWatched());
	};

	useEffect(() => {
		const intervalId = setInterval(() => {
			if (Player) {
				if (Player.target.getCurrentTime() / Player.target.getDuration() >= 0.75) {
					console.log(Content);
					handleMarkAsWatched();
					clearInterval(intervalId);
				}
			}
		}, 2000);
		return () => clearInterval(intervalId);
	}, [Player]);

	return (
		<Card className="video-responsive">
			<YouTube videoId={videoId} onReady={(e) => setPlayer(e)} />
		</Card>
	);
};

YoutubeEmbed.propTypes = {
	src: PropTypes.string.isRequired,
};

export default YoutubeEmbed;
