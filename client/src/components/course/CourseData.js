import { Card } from "react-bootstrap";
import YouTube from "react-youtube";

function CourseData({ course }) {
	let videoId;
	if (course.previewVideo.includes("watch?v=")) videoId = course.previewVideo.split("watch?v=")[1];
	else videoId = course.previewVideo.split("/")[course.previewVideo.split("/").length - 1];

	return (
		<>
			<h5>Hours</h5>
			<p className="lead">{Math.ceil(course.totalSeconds / 3600)} Total</p>
			<h5>Enrolled</h5> <p className="lead">{course.enrolledTrainees.length} Students </p>
			<h5>Summary</h5>
			<p className="lead">{course.summary}</p>
			<h5>Preview Video</h5>
			<Card className="video-responsive">
				<YouTube videoId={videoId} />
			</Card>
		</>
	);
}

export default CourseData;
