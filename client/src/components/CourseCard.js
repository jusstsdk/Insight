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
function CourseCard({ course }) {
	const userType = useSelector((state) => state.userReducer.type);
	const user = useSelector((state) => state.userReducer.user);
	const currency = useSelector((state) => state.userReducer.user.currency);
	const navigate = useNavigate();
	const handleOpen = () => {
		if(userType === "Administrator"){
			navigate("/admin/courses/" + course._id);
		} else{
			navigate("/" + userType.toLowerCase() + "/courses/" + course._id);
		}
		
	};
	const [showContinue, setShowContinue] = useState(false);
	

	function continueCourse() {
		navigate("/" + userType.toLowerCase() + "/courses/" + course._id +  "/continueCourse", {
			state: {
				course: { _id: course._id, title: course.title },
			},
		});
	}
	useEffect(() => {
		if(!(userType === "Administrator" || userType === "Instructor" || userType === "Guest")) {
			if(user.courses.findIndex((c) => c._id === course._id) !== -1) {
				setShowContinue(true);
			}
		}
		
		
	}, []);
	return (
		<>
			<Card className="my-3">
				<Card.Body>
					{/* Title and Stars */}
					<CardGroup as={Row} className=" align-items-center">
						<Card.Title className="courseCardTitle">
							{course.title}
						</Card.Title>

						<p className="textFit my-auto text-muted">
							{course.totalHours} Hours
						</p>

						<Col sm={6}>
							{course.subjects.map((subject, i) => (
								<Badge
									key={"subject_badge_" + i}
									className="p-2 mx-1 "
								>
									{subject}
								</Badge>
							))}
						</Col>
						<Col className="starsContainer" sm={4} md={4} lg={2}>
							<Stars
								key={"stars_" + course._id}
								id={course._id}
								stars={course.rating ? course.rating : 0}
							/>
						</Col>
					</CardGroup>

					{/* Summary and Price */}
					<CardGroup as={Row} className="my-2">
						<h6 className="textFit courseCardLabel">
							Number of students :{" "}
							{course.enrolledTrainees.length}
						</h6>
					</CardGroup>
					<CardGroup as={Row} className="my-2">
						<h6 className="text-muted textFit courseCardLabel">
							Summary
						</h6>
						<Col sm={8}>
							<Card.Text>{course.summary}</Card.Text>
						</Col>
						<Col
							sm={1}
							className="priceContainer textFit d-flex justify-content-end"
						>	
							<Card.Text className="priceLabel">
								{course.originalPrice} {currency}
							</Card.Text>
						</Col>
					</CardGroup>

					{/* Instructors and View Course*/}
					<CardGroup as={Row} className="mt-2 align-items-center">
						<h6 className="text-muted textFit courseCardLabel my-1">
							Instructors
						</h6>
						<Col sm={2}>
							<ListGroup horizontal>
								{course.instructors.map((instructor, i) => (
									<Button
										className="p-0 me-2"
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
											} else if (
												userType === "Instructor"
											) {
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
							</ListGroup>
						</Col>
						<Col
							sm={1}
							className="priceContainer textFit  d-flex justify-content-end"
						>
							<strong>
								{course.promotion.discount > 0 && course.promotion.endDate > new Date().toISOString() && (
									<Card.Text className="priceLabel  discountLabel">
										{course.promotion.discount}% off
									</Card.Text>
								)}
							</strong>
						</Col>
						<Col
							className="viewCourseButton d-flex  justify-content-end"
							sm={2}
							md={2}
							lg={2}
						>
							<Button onClick={handleOpen}>View Course</Button>
							{showContinue && <Button variant="success" className="" onClick={continueCourse}>Continue Course</Button>}
						</Col>
					</CardGroup>
				</Card.Body>
			</Card>
		</>
	);
}
export default CourseCard;
