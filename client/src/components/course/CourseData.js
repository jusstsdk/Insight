import { Card, Col, Container, Row } from "react-bootstrap";
import YouTube from "react-youtube";
import { CiClock1 } from "react-icons/ci";
import { Rating } from "react-simple-star-rating";
import { HiUsers } from "react-icons/hi";
function CourseData({ course }) {
	let videoId;
	if (course.previewVideo.includes("watch?v=")) videoId = course.previewVideo.split("watch?v=")[1];
	else videoId = course.previewVideo.split("/")[course.previewVideo.split("/").length - 1];

	return (
		<>
			{/* Stats */}
			<Row className="mt-2 mb-3">
				{/* Ratings */}
				<div className="d-flex fitWidth">
					<Rating
						className="fitWidth"
						allowFraction="true"
						initialValue={course.rating}
						readonly="true"
						size={22}
					/>
					<h5 className="fitWidth my-auto ms-2 fw-bold ratingColor">{course.rating}</h5>
					<a href="#courseReviews" className="ms-2 text-muted my-auto">
						({course.reviews.length} Ratings)
					</a>
				</div>
				{/* Hours */}
				<div className="fitWidth d-flex align-items-center">
					<CiClock1 size={30} />
					<h5 className="ms-2 my-auto fitWidth">
						Approx. {Math.ceil(course.totalSeconds / 3600)} hours to complete
					</h5>
				</div>
				{/* Students */}
				<div className="d-flex align-items-center fitWidth">
					<HiUsers size={30} />
					<h5 className="ms-2 my-auto fitWidth">{course.enrolledTrainees.length} Students</h5>
				</div>
			</Row>

			{/* Summary */}
			<div>
				<h5 className="fst-italic">Summary</h5>
				<p className="lead">{course.summary}</p>
			</div>
			{/* Preview Video */}
			<>
				<h5 className="fst-italic">Preview Video</h5>
				<Container>
					<Card className="video-responsive">
						<YouTube videoId={videoId} />
					</Card>
				</Container>
			</>
		</>
	);
}

export default CourseData;
