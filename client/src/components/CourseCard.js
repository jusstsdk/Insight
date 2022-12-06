import React, { useState } from "react";

import { Card, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function CourseCard({ course }) {
	const [show, setShow] = useState(false);
	const navigate = useNavigate();
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleOpen = () => {
		navigate(`/CourseDetails/${course._id}`);
	};

	return (
		<>
			<Card
				border="light"
				style={{ width: "18rem" }}
				bg="primary"
				key={course._id}
				text="white"
				className="mb-2"
			>
				<Card.Body>
					<Card.Title>{course.title}</Card.Title>
					<Card.Text>
						total hours : {course.totalHours}
						price : {course.price}
						rating : {course.rating}
						<Button variant="primary" onClick={handleShow}>
							view details
						</Button>
					</Card.Text>
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
