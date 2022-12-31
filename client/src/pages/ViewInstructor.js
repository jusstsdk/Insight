import { useEffect, useState, useRef } from "react";
import { Container, Tabs, Tab, Row, Col, Modal, Form } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import InstructorReviewCard from "../components/instructor/InstructorReviewCard";
import API from "../functions/api";
import { Button } from "@mui/material";
import RateReviewRoundedIcon from "@mui/icons-material/RateReviewRounded";
import { useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";
export default function ViewInstructor() {
	const location = useLocation();
	const { id } = useParams();

	// const instructorId = location.state.instructorId;
	const instructorId = id;
	const user = useSelector((state) => state.userReducer.user);
	const userID = useSelector((state) => state.userReducer.user._id);
	const userType = useSelector((state) => state.userReducer.type);
	const [instructorTeachesTrainee, setInstructorTeachesTrainee] =
		useState(false);

	const [InstructorInfo, setInstructorInfo] = useState([]);
	const [InstructorCourses, setInstructorCourses] = useState([]);
	const [InstructorReviews, setInstructorReviews] = useState([]);

	const [loaded, setLoaded] = useState(true);

	//modal
	const [showReviewInstructorModal, setShowReviewInstructorModal] =
		useState(false);
	const handleCloseReviewInstructorModal = () =>
		setShowReviewInstructorModal(false);
	const handleShowReviewInstructorModal = () =>
		setShowReviewInstructorModal(true);
	const reviewInstructorDescription = useRef();

	const getInstructorCourses = async () => {
		try {
			const response = await API.get(`/instructors/${instructorId}/courses`);
			response.data.courses.forEach((course) => {
				course.originalPrice = (
					course.originalPrice * user.exchangeRate
				).toFixed(2);
				course.price = (course.price * user.exchangeRate).toFixed(2);
			});
			response.data.courses = response.data.courses.filter((course) => course.status === "Published");
			setInstructorCourses(response.data.courses);

			if (userType === "Trainee" || userType === "CorporateTrainee") {
				response.data.courses.forEach((instructorCourse) => {
					user.courses.forEach((traineeCourse) => {
						// console.log("trainee: ");
						// console.log(traineeCourse);
						// console.log("instructor: ");
						// console.log(instructorCourse);
						if (instructorCourse._id === traineeCourse.course) {
							console.log(true);
							setInstructorTeachesTrainee(true);
						}
					});
				});
			}
		} catch (err) {
			console.log(err);
		}
	};

	const getInstructorReviews = async () => {
		try {
			const response = await API.get(`/instructors/${instructorId}/reviews`);
			setInstructorInfo(response.data);
			setInstructorReviews(response.data.reviews);
		} catch (err) {
			console.log(err);
		}
	};

	const [instructorRating, setInstructorRating] = useState(0);
	const handleInstructorRating = (rating) => {
		setInstructorRating(rating);
	};
	async function reviewInstructor() {
		let data = {
			rating: instructorRating,
			review: reviewInstructorDescription.current.value,
			trainee: userID,
			traineeType: userType,
		};

		handleCloseReviewInstructorModal();
		try {
			const response = await API.post(
				`/instructors/${instructorId}/review`,
				data
			);

			getInstructorReviews();
		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		getInstructorCourses();
		getInstructorReviews();
		setLoaded(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [instructorId]);

	return (
		loaded && (
			<Container className="my-3">
				<Row>
					<Col>
						<h1 className="fw-bold">{InstructorInfo.username}</h1>
					</Col>
					<Col className="d-flex justify-content-end">
						{userType !== "Instructor" && instructorTeachesTrainee && (
							<Button
								color="primary"
								variant="contained"
								endIcon={<RateReviewRoundedIcon />}
								onClick={handleShowReviewInstructorModal}
							>
								Review instructor
							</Button>
						)}
					</Col>
				</Row>

				<h5 
					className="text-muted">{InstructorInfo.email} {" "}
					<Rating
							allowFraction="true"
							initialValue={InstructorInfo.rating}
							readonly="true"
							size={22}
					/> 
					{InstructorReviews.length > 0 && ( <small >({InstructorReviews.length})</small> ) }
				</h5>
				
				<p className="lh-base">{InstructorInfo.biography}</p>
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

				<Modal
					show={showReviewInstructorModal}
					onHide={handleCloseReviewInstructorModal}
				>
					<Modal.Header closeButton>
						<Modal.Title>Rate </Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group className="mb-3" controlId="rateCourse">
								<Rating
									allowFraction="true"
									onClick={handleInstructorRating}
									/* Available Props */
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="ratingDescription">
								<Form.Label>Description</Form.Label>
								<Form.Control
									as="textarea"
									ref={reviewInstructorDescription}
									placeholder="Review"
									rows={3}
									style={{ height: "100px" }}
								/>
							</Form.Group>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant="secondary"
							onClick={handleCloseReviewInstructorModal}
						>
							Cancel
						</Button>
						<Button variant="primary" onClick={reviewInstructor}>
							Submit
						</Button>
					</Modal.Footer>
				</Modal>
			</Container>
		)
	);
}
