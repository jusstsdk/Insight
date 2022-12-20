import { Button, Badge, Card, CardGroup, Col, Row, ListGroup, Modal } from "react-bootstrap";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Stars from "./Stars";
import { useSelector } from "react-redux";
function CourseCard({ course }) {
	const [show, setShow] = useState(false);
	const userType = useSelector((state) => state.userReducer.type);
	const navigate = useNavigate();
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleOpen = () => {
		navigate("/" + userType.toLowerCase() + "/courses/" + course._id);
	};
	return (
		<>
			<Card className="my-3">
				<Card.Body>
					{console.log(course)}
					{/* Title and Stars */}
					<CardGroup as={Row} className=" align-items-center">
						<Card.Title className="courseCardTitle">{course.title}</Card.Title>

						<p className="textFit my-auto text-muted">{course.totalHours} Hours</p>

						<Col sm={6}>
							{course.subjects.map((subject, i) => (
								<Badge key={"subject_badge_" + i} className="p-2 mx-1 ">
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
						<h6 className="text-muted courseCardLabel">Summary</h6>
						<Col sm={8}>
							<Card.Text>{course.summary}</Card.Text>
						</Col>
						<Col sm={1} className="priceContainer d-flex justify-content-end">
							<Card.Text className="priceLabel">{course.originalPrice}$</Card.Text>
						</Col>
					</CardGroup>

					{/* Instructors and View Course*/}
					<CardGroup as={Row} className="mt-2 align-items-center">
						<h6 className="text-muted courseCardLabel my-1">Instructors</h6>
						<Col sm={2}>
							<ListGroup horizontal>
								{course.instructors.map((instructor, i) => (
									<a href="#" key={"instructor_" + i} className="mx-1">
										{instructor.username}
									</a>
								))}
							</ListGroup>
						</Col>
						<Col className="viewCourseButton d-flex  justify-content-end" sm={2} md={2} lg={2}>
							<Button onClick={handleShow}>View Course</Button>
						</Col>
					</CardGroup>
				</Card.Body>
			</Card>
			<Modal size="lg" show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{course.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>total hours : {course.totalHours}</p>
					<p>price : {course.price}</p>
					<p>rating : {course.rating}</p>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleOpen}>
						open course
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
export default CourseCard;
