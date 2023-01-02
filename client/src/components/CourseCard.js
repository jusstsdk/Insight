import {
	Button,
	Badge,
	Card,
	CardGroup,
	Col,
	Row,
	ListGroup,
	Modal,
} from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Stars from "./Stars";
import { useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";
import UniversalCourseCard from "./UniversalCourseCard";

function CourseCard({ course }) {
	const user = useSelector((state) => state.userReducer.user);
	const userType = useSelector((state) => state.userReducer.type);
	const currency = useSelector((state) => state.userReducer.user.currency);

	const navigate = useNavigate();

	const [loaded, setLoaded] = useState(false);

	const handleViewCourse = () => {
		if (userType === "Administrator") {
			navigate("/admin/courses/" + course._id);
		} else {
			navigate("/" + userType.toLowerCase() + "/courses/" + course._id);
		}
	};

	const [ownsCourse, setOwnsCourse] = useState(false);
	const [traineeRequestedRefund, setTraineeRequestedRefund] = useState(false);

	function continueCourse() {
		navigate(
			"/" +
				userType.toLowerCase() +
				"/courses/" +
				course._id +
				"/continueCourse",
			{
				state: {
					course: { _id: course._id, title: course.title },
				},
			}
		);
	}

	useEffect(() => {
		if (
			!(
				userType === "Administrator" ||
				userType === "Instructor" ||
				userType === "Guest"
			)
		) {
			user.courses.forEach((userCourse) => {
				if (userCourse.course === course._id) {
					if (userType === "Trainee") {
						if (userCourse.requestedRefund === true) {
							setTraineeRequestedRefund(true);
						} else {
							setOwnsCourse(true);
						}
					}
					if (userType === "CorporateTrainee") {
						setOwnsCourse(true);
					}
				}
			});
		}
	}, []);

	return false ? (
		<>
			<Card className="my-3" bg="light">
				<Card.Body>
					{/* Title and Stars */}
					<CardGroup as={Row} className=" align-items-center">
						<Card.Title className="courseCardTitle pe-0">
							{course.title}
						</Card.Title>

						<p className="textFit my-auto text-muted">
							{Math.ceil(course.totalSeconds / 3600)} Hours
						</p>

						<Col sm={5}>
							{course.subjects.map((subject, i) =>
								i <= 1 ? (
									<Badge
										key={"subject_badge_" + i}
										className="p-2 mx-1"
									>
										{subject}
									</Badge>
								) : (
									""
								)
							)}
							{course.subjects.length >= 2 && <span>...</span>}
						</Col>

						<Col
							className="starsContainer fitWidth"
							sm={4}
							md={4}
							lg={2}
						>
							<Rating
								key={"stars_" + course._id}
								id={course._id}
								allowFraction="true"
								initialValue={course.rating ? course.rating : 0}
								readonly="true"
								size={20}
							/>
						</Col>
					</CardGroup>

					{/* Summary and Price */}

					<Row as={Row} className="my-2">
						<h6 className="text-muted textFit courseCardLabel my-1">
							Instructor
						</h6>

						{course.instructors.map((instructor, i) => (
							<Button
								className="p-0 me-2 fitWidth"
								variant="link"
								onClick={() => {
									if (userType === "Trainee") {
										navigate(
											"/trainee/viewInstructor/" +
												instructor._id
										);
									} else if (
										userType === "CorporateTrainee"
									) {
										navigate(
											"/corporateTrainee/viewInstructor/" +
												instructor._id
										);
									} else if (userType === "Instructor") {
										navigate(
											"/instructor/viewInstructor/" +
												instructor._id
										);
									}
								}}
								key={"instructor_" + i}
							>
								{instructor.username}
							</Button>
						))}
						<h6 className=" fitWidth my-auto">
							<span className="text-muted">Students: </span>
							{course.enrolledTrainees.length}
						</h6>
					</Row>
					<CardGroup as={Row} className="my-2">
						<h6 className="text-muted textFit courseCardLabel">
							Summary
						</h6>
						<Col sm={8}>
							<Card.Text>
								{course.summary.length < 200
									? course.summary
									: course.summary.substring(0, 200) + "..."}
							</Card.Text>
						</Col>
						<Col
							sm={1}
							className="priceContainer textFit d-flex justify-content-end"
						>
							<Card.Text className="priceLabel">
								{ownsCourse ? (
									<h5>Owned</h5>
								) : traineeRequestedRefund ? (
									<h5>Refund Requested</h5>
								) : userType !== "CorporateTrainee" ? (
									course.promotion.discount &&
									course.promotion.discount !== 0 &&
									course.promotion.endDate >=
										new Date().toISOString() ? (
										<>
											<h5>
												{"" +
													(course.price === 0.0
														? "FREE"
														: course.price) +
													" " +
													currency}
											</h5>
											<del>{course.originalPrice}</del>{" "}
											<span style={{ color: "red" }}>
												{"" +
													course.promotion.discount +
													"% OFF"}
											</span>
										</>
									) : (
										<h5 style={{ display: "inline-block" }}>
											{course.originalPrice === 0.0
												? "FREE"
												: course.originalPrice +
												  " " +
												  currency}
										</h5>
									)
								) : (
									<></>
								)}
							</Card.Text>
						</Col>
					</CardGroup>

					{/* Instructors and View Course*/}
					<CardGroup as={Row} className="mt-2 align-items-center">
						<Col
							className="ms-auto fitWidth d-flex  justify-content-end"
							sm={2}
							md={2}
							lg={2}
						>
							<Button onClick={handleViewCourse}>
								View Course
							</Button>
							{ownsCourse && (
								<Button
									variant="outline-primary"
									className=""
									onClick={continueCourse}
								>
									Continue Course
								</Button>
							)}
						</Col>
					</CardGroup>
				</Card.Body>
			</Card>
		</>
	) : (
		<></>
	);
}
export default CourseCard;
