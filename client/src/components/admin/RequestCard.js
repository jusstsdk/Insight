import {
	Button,
	Badge,
	Card,
	CardGroup,
	Col,
	Row,
	ListGroup,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import Stars from "../Stars";
import api from "../../functions/api";
import { useSelector } from "react-redux";

function RequestCard({ request, course }) {
	const [handled, setHandled] = useState(false);
	const [message, setMessage] = useState("");
	const [variant, setVariant] = useState("");
	const [show, setShow] = useState(true);
	const token = useSelector((state) => state.userReducer.token);
	async function grantAccess() {
		await api.put(
			"/administrators/requests",
			{
				requestId: request._id,
				status: "accepted",
			},
			{
				headers: { authorization: "Bearer " + token },
			}
		);
		setHandled(true);
		setMessage("Access Granted");
		setVariant("success");
	}
	async function denyAccess() {
		await api.put(
			"/administrators/requests",
			{
				requestId: request._id,
				status: "denied",
			},
			{
				headers: { authorization: "Bearer " + token },
			}
		);
		setHandled(true);
		setMessage("Access Denied");
		setVariant("danger");
	}
	useEffect(() => {
		if (request.status !== "pending") {
			setShow(false);
		}
	}, []);
	return (
		show && (
			<Card className="my-3">
				<Card.Body>
					{/* Title and Stars */}
					<CardGroup as={Row} className=" align-items-center">
						<Card.Title className="courseCardTitle">
							{course.title}
						</Card.Title>
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
							<Stars stars={course.rating ? course.rating : 0} />
						</Col>
					</CardGroup>

					{/* Summary and Price */}
					<CardGroup as={Row} className="my-2">
						<h6 className="text-muted courseCardLabel">Summary</h6>
						<Col sm={8}>
							<Card.Text>{course.summary}</Card.Text>
						</Col>
						<Col
							className="viewCourseButton d-flex  justify-content-end"
							sm={2}
							md={2}
							lg={2}
						>
							{!handled && (
								<>
									<Button
										variant="danger"
										onClick={denyAccess}
									>
										Deny access
									</Button>
									<Button
										variant="success"
										onClick={grantAccess}
									>
										Grant access
									</Button>
								</>
							)}
							{handled && <h6 className={variant}>{message}</h6>}
						</Col>
					</CardGroup>

					{/* Instructors and View Course*/}
				</Card.Body>
			</Card>
		)
	);
}
export default RequestCard;
