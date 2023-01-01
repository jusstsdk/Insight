import { Button, Badge, Card, CardGroup, Col, Row, ListGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import Stars from "../Stars";
import api from "../../functions/api";
import { useSelector, useDispatch } from "react-redux";
import { addNotification } from "../../redux/notificationsSlice";
import { useNavigate } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
function RequestCard({ request, course, username, detectChange, setDetectChange  }) {
	const [handled, setHandled] = useState(false);
	const [message, setMessage] = useState("");
	const [variant, setVariant] = useState("");
	const [show, setShow] = useState(true);
	const token = useSelector((state) => state.userReducer.token);
	const dispatch = useDispatch();
	const navigate = useNavigate();
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
		dispatch(
			addNotification({
				title: "access granted",
				info: "access to course '" + course.title + "' granted to " + username,
				color: "success",
			})
		);
		setDetectChange(!detectChange);
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
		dispatch(
			addNotification({
				title: "access granted",
				info: "access to course '" + course.title + "' denied to " + username,
				color: "danger",
			})
		);
		setDetectChange(!detectChange);
	}
	useEffect(() => {
		if (request.status.toLowerCase() !== "pending") {
			setShow(false);
		}
	}, []);
	return (
		show && (
			<Card className="my-3">
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
						<h6 className="text-muted courseCardLabel">Summary</h6>
						<Col sm={8}>
							<Card.Text>{course.summary}</Card.Text>
						</Col>
					</CardGroup>

					{/* Instructors and View Course*/}
					<CardGroup as={Row} className="mt-2 align-items-center">
						<h6 className="text-muted textFit courseCardLabel my-1">Instructors</h6>
						<Col sm={2}>
							<ListGroup horizontal>
								{course.instructors.map((instructor, i) => (
									<Button
										className="p-0 me-2"
										variant="link"
										onClick={() => navigate("/admin/viewInstructor/" + instructor._id)}
										key={"instructor_" + i}>
										{instructor.username}
									</Button>
								))}
							</ListGroup>
						</Col>
						<Col className="viewCourseButton d-flex  justify-content-end" sm={2} md={2} lg={2}>
							{!handled && (
								<>
									<Button variant="danger" onClick={denyAccess}>
										Deny access
									</Button>
									<Button className="ms-1	" variant="success" onClick={grantAccess}>
										Grant access
									</Button>
								</>
							)}
							{handled && <h6 className={variant}>{message}</h6>}
						</Col>
					</CardGroup>
				</Card.Body>
			</Card>
		)
	);
}
export default RequestCard;