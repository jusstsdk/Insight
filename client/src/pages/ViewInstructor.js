import { useEffect, useState, useRef } from "react";
import { Container, Tabs, Tab, Row, Col, Modal, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import InstructorReviewCard from "../components/instructor/InstructorReviewCard";
import API from "../functions/api";
import { Button } from "react-bootstrap";
import RateReviewRoundedIcon from "@mui/icons-material/RateReviewRounded";
import { useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";
import UniversalCourseCard from "../components/UniversalCourseCard";
import { IoIosPin } from "react-icons/io";
import RatingStats from "../components/RatingStats";

export default function ViewInstructor({ isInstructor }) {
	const { id } = useParams();
	const navigate = useNavigate();

	// const instructorId = location.state.instructorId;
	const userID = useSelector((state) => state.userReducer.user._id);
	const instructorId = !isInstructor ? id : userID;
	const user = useSelector((state) => state.userReducer.user);
	const userType = useSelector((state) => state.userReducer.type);
	const [instructorTeachesTrainee, setInstructorTeachesTrainee] = useState(false);

	const [InstructorInfo, setInstructorInfo] = useState([]);
	const [InstructorCourses, setInstructorCourses] = useState([]);
	const [InstructorReviews, setInstructorReviews] = useState([]);

	const [loaded, setLoaded] = useState(true);

	//modal
	const [showReviewInstructorModal, setShowReviewInstructorModal] = useState(false);
	const handleCloseReviewInstructorModal = () => setShowReviewInstructorModal(false);
	const handleShowReviewInstructorModal = () => setShowReviewInstructorModal(true);
	const reviewInstructorDescription = useRef();

	const getInstructorCourses = async () => {
		try {
			const response = await API.get(`/instructors/${instructorId}/courses`);
			response.data.courses.forEach((course) => {
				course.originalPrice = (course.originalPrice * user.exchangeRate).toFixed(2);
				course.price = (course.price * user.exchangeRate).toFixed(2);
			});
			response.data.courses = response.data.courses.filter(
				(course) => course.status === "Published"
			);
			setInstructorCourses(response.data.courses);

			if (userType === "Trainee" || userType === "CorporateTrainee") {
				response.data.courses.forEach((instructorCourse) => {
					user.courses.forEach((traineeCourse) => {
						// console.log("trainee: ");
						// console.log(traineeCourse);
						// console.log("instructor: ");
						// console.log(instructorCourse);
						if (instructorCourse._id === traineeCourse.course) {
							setInstructorTeachesTrainee(true);
						}
					});
				});
			}
		} catch (err) {
			navigate("/notFound");
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

	let instructorRating = 0;
	const handleInstructorRating = (rating) => {
		instructorRating = rating;
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
			await API.post(`/instructors/${instructorId}/review`, data);

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
	}, [instructorId, user]);

	return (
		loaded && (
			<Container className="my-3">
				<Row>
					<Col md="auto">
						<h1 className="fw-bold">
							{InstructorInfo.firstName
								? InstructorInfo.firstName + " " + InstructorInfo.lastName
								: InstructorInfo.username}
						</h1>
					</Col>
					<Col className="d-flex align-items-center">
						<div className="fitWidth fitHeight pe-1 ">
							<Rating
								allowFraction="true"
								initialValue={InstructorInfo.rating}
								readonly="true"
								size={22}
							/>
						</div>
						{InstructorReviews.length > 0 && (
							<small className="text-muted fitWidth my-auto ps-0">
								({InstructorReviews.length} Ratings)
							</small>
						)}
					</Col>
					<Col className="d-flex justify-content-end">
						{(userType === "Trainee" || userType === "CorporateTrainee") &&
							instructorTeachesTrainee && (
								<Button
									// endIcon={<RateReviewRoundedIcon />}
									onClick={handleShowReviewInstructorModal}>
									Rate Instructor
								</Button>
							)}
					</Col>
				</Row>
				<h5 className="text-muted">{InstructorInfo.email} </h5>
				<hr />
				<Row>
					<Col>
						<h5 className="fw">Biography</h5>
					</Col>
					<Col>
						<h6 style={{ float: "right" }}>
							<IoIosPin /> {InstructorInfo.country}
						</h6>
					</Col>
				</Row>
				<p className="lh-base text-muted">{InstructorInfo.biography}</p>

				<hr />
				<Tabs id="controlled-tab-example" defaultActiveKey="Courses" className="mb-3">
					<Tab eventKey="Courses" title="Courses">
						{InstructorCourses.map((course, i) => (
							<UniversalCourseCard
								key={`course_${course}_${i}`}
								course={course}
								cardType={"Basic"}
							/>
						))}
					</Tab>
					<Tab eventKey="Reviews" title="Reviews">
						<Row>
							{/* Stats */}
							<RatingStats rating={InstructorInfo.rating} reviews={InstructorReviews} />
							{/* Reviews */}
							<Col sm={8}>
								{InstructorReviews.slice()
									.reverse()
									.map((review) => (
										<InstructorReviewCard key={"review_" + review.trainee._id} review={review} />
									))}
							</Col>
						</Row>
					</Tab>
				</Tabs>

				<Modal show={showReviewInstructorModal} onHide={handleCloseReviewInstructorModal}>
					<Modal.Header closeButton>
						<Modal.Title>Rate Instructor</Modal.Title>
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
						<Button variant="secondary" onClick={handleCloseReviewInstructorModal}>
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
