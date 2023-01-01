import {
	Button,
	Badge,
	Card,
	CardGroup,
	Col,
	Row,
	ListGroup,
	Modal,
	Form,
} from "react-bootstrap";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Stars from "./Stars";
import { useSelector } from "react-redux";
import { Rating } from "react-simple-star-rating";
import UniversalCourseCard from "./UniversalCourseCard";

export default function CourseCardCheckbox({
	course,
	handleCheck,
	defaultChecked,
	bg,
}) {
	const univesal = true;
	const [show, setShow] = useState(false);
	const userType = useSelector((state) => state.userReducer.type);
	const user = useSelector((state) => state.userReducer.user);
	const navigate = useNavigate();
	const handleClose = () => setShow(false);
	const handleOpen = () => {
		navigate("/" + userType.toLowerCase() + "/courses/" + course._id);
	};
	return univesal ? (
		<UniversalCourseCard
			course={course}
			handleCheck={handleCheck}
			defaultChecked={defaultChecked}
			cardColor={bg}
			cardType={"Discount"}
		></UniversalCourseCard>
	) : (
		<>
			<Card className="my-3" bg={bg}>
				<Card.Body>
					{/* Title and Stars */}
					<CardGroup as={Row} className=" align-items-center">
						<Card.Title className="courseCardTitle">{course.title}</Card.Title>
						<Col sm={6}>
							{course.subjects.map((subject, i) => (
								<Badge key={"subject_badge_" + i} className="p-2 mx-1 ">
									{subject}
								</Badge>
							))}
						</Col>
						<Col className="starsContainer fitWidth" sm={4} md={4} lg={2}>
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
					<CardGroup as={Row} className="my-2">
						<h6 className="text-muted courseCardLabel fitWidth">Summary</h6>
						<Col sm={9}>
							<Card.Text>{course.summary}</Card.Text>
						</Col>
						<Col sm={1} className="priceContainer d-flex justify-content-end">
							<Card.Text className="priceLabel">
								{course.originalPrice}
								{user.currency}
							</Card.Text>
						</Col>
					</CardGroup>

					{/* Instructors and View Course*/}
					<CardGroup as={Row} className="mt-2 align-items-center">
						<h6 className="text-muted courseCardLabel my-1 fitWidth p-0">
							Instructor
						</h6>
						<Col sm={2}>
							<ListGroup horizontal>
								{course.instructors.map((instructor, i) => (
									<a href="#" key={"instructor_" + i} className="mx-1">
										{instructor.username}
									</a>
								))}
							</ListGroup>
						</Col>
						<Col
							className="viewCourseButton d-flex  justify-content-end"
							sm={2}
							md={2}
							lg={2}
						>
							<Form.Check
								defaultChecked={defaultChecked}
								value={course._id}
								type="checkbox"
								label="Select For Promotion"
								onChange={(e) => {
									handleCheck(e);
								}}
							/>
						</Col>
					</CardGroup>
				</Card.Body>
			</Card>
			<Modal size="lg" show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{course.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>total hours : Math.ceil({course.totalSeconds / 3600})</p>
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
