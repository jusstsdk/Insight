import { useEffect, useState } from "react";
import { Container, Tabs, Tab } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import InstructorReviewCard from "../components/Instructor/InstructorReviewCard";
import API from "../functions/api";
export default function ViewInstructor() {
	const location = useLocation();
	const instructorId = location.state.instructorId;
	const [InstrcutorInfo, setInstrcutorInfo] = useState([]);
	const [InstructorCourses, setInstructorCourses] = useState([]);
	const [InstructorReviews, setInstructorReviews] = useState([]);

	const getInstructorCourses = async () => {
		try {
			const response = await API.get(`/instructors/${instructorId}/courses`);
			setInstructorCourses(response.data.courses);
		} catch (err) {
			console.log(err);
		}
	};

	const getInstructorReviews = async () => {
		try {
			const response = await API.get(`/instructors/${instructorId}/reviews`);
			setInstrcutorInfo(response.data);
			setInstructorReviews(response.data.reviews);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getInstructorCourses();
		getInstructorReviews();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [instructorId]);

	return (
		<Container className="my-3">
			<h1 className="fw-bold">{InstrcutorInfo.username}</h1>
			<h5 className="text-muted">{InstrcutorInfo.email}</h5>
			<p className="lh-base">{InstrcutorInfo.biography}</p>
			<Tabs
				id="controlled-tab-example"
				defaultActiveKey="Courses"
				className="mb-3"
			>
				<Tab eventKey="Courses" title="Courses">
					{InstructorCourses.map((course, i) => (
						<CourseCard key={"course_" + i} course={course} />
					))}
				</Tab>
				<Tab eventKey="Reviews" title="Reviews">
					{InstructorReviews.map((review) => (
						<InstructorReviewCard
							key={"review_" + review.trainee.email}
							traineeEmail={review.trainee.email}
							review={review.review}
							rating={review.rating}
						/>
					))}
				</Tab>
			</Tabs>

			{/* <Col lg={8} className="d-flex flex-column justify-content-center m-auto">
				{Reviews.map((review) => (
					<InstructorReviewCard
						key={"review_" + review.trainee.email}
						traineeEmail={review.trainee.email}
						review={review.review}
						rating={review.rating}
					/>
				))}
			</Col> */}
		</Container>
	);
}
