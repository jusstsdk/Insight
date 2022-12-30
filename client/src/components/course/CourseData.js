import { Col } from "react-bootstrap";

function CourseData(props) {
	const course = props.course;
	return (
		<>
			<h5>Hours</h5>
			<p className="lead">{Math.ceil(course.totalSeconds / 3600)} Total</p>
			<h5>Enrolled</h5>{" "}
			<p className="lead">{course.enrolledTrainees.length} Students </p>
			<h5>Summary</h5>
			<p className="lead">{course.summary}</p>
			<h5>Preview Video</h5>
			<iframe
				width="560"
				height="500"
				src={course.previewVideo} //SHOULD BE {course.previewVideo} ONCE WE FIX DATABASE
				title="Preview Video"
				allowFullScreen
			/>
		</>
	);
}

export default CourseData;
