import { Card, Col, Row } from "react-bootstrap";
import YouTube from "react-youtube";
import CourseInstructorsList from "./CourseInstructorsList";
function CourseData({ course, instructors }) {
	let videoId;
	if (course.previewVideo.includes("watch?v=")) videoId = course.previewVideo.split("watch?v=")[1];
	else videoId = course.previewVideo.split("/")[course.previewVideo.split("/").length - 1];
	videoId = videoId.split("&")[0];
	return (
		<Row>
			{/* Summary */}
			<Col>
				<h5 className="fst-italic">Summary</h5>
				<p className="lead">{course.summary}</p>
			</Col>
			{/* Preview Video */}
			<Col className="px-0 ">
				<h5 className="fst-italic">Preview Video</h5>
				<Card className="video-responsive mb-3">
					<YouTube videoId={videoId} />
				</Card>
				<CourseInstructorsList instructors={instructors}></CourseInstructorsList>
			</Col>
		</Row>
	);
}

export default CourseData;
