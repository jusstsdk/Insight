import { Button, Form, Card } from "react-bootstrap";
import { useRef } from "react";
import axios from "axios";
import API from "../api";
import { useSelector } from "react-redux";

function PersonalInfo() {
	const { firstName, lastName, gender, courses, paymentMethods } = useSelector(
		(state) => state.userReducer.user
	);

	return (
		<>
			<Card>
				<Card.Img />
				<Card.Body>
					<Card.Title>
						Hello, {firstName} {lastName}
					</Card.Title>
					<Card.Text>
						Your Courses:
						{courses.map((course) => (
							<h1>course.Title</h1>
						))}
					</Card.Text>
				</Card.Body>
			</Card>
		</>
	);
}

export default PersonalInfo;
