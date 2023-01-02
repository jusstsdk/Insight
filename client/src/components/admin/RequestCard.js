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
import { useSelector, useDispatch } from "react-redux";
import { addNotification } from "../../redux/notificationsSlice";
import { useNavigate } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
function RequestCard({
	request,
	course,
	username,
	DetectChange,
	setDetectChange,
}) {
	const [handled, setHandled] = useState(false);
	const [message, setMessage] = useState("");
	const [variant, setVariant] = useState("");
	const [show, setShow] = useState(true);
	const token = useSelector((state) => state.userReducer.token);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const MySwal = withReactContent(Swal);
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
		MySwal.fire({
			toast: true,
			position: "bottom-end",
			showConfirmButton: false,
			timer: 4000,
			title: <strong>Access granted</strong>,
			html: (
				<i>
					{"Access to course '" +
						course.title +
						"' granted to " +
						username}
				</i>
			),
			icon: "success",
			timerProgressBar: true,
			grow: "row",
		});
		setDetectChange(!DetectChange);
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
		MySwal.fire({
			toast: true,
			position: "bottom-end",
			showConfirmButton: false,
			timer: 4000,
			title: <strong>Access denied</strong>,
			html: (
				<i>
					{"Access to course '" +
						course.title +
						"' denied to " +
						username}
				</i>
			),
			icon: "error",
			timerProgressBar: true,
			grow: "row",
		});
		setDetectChange(!DetectChange);
	}
	useEffect(() => {
		if (request.status.toLowerCase() !== "pending") {
			setShow(false);
		}
	}, []);
	return (
		show &&
		!handled && (
			<Card bg="light" className="my-3">
				<Card.Body>
					{/* Title and Stars */}
					<CardGroup as={Row} className=" align-items-center">
						<Card.Title className="courseCardTitle">
							{course.title}
						</Card.Title>
						<Col sm={6}>
							{course.subjects.map((subject, i) => (
								<Badge
									bg="dark"
									key={"subject_badge_" + i}
									className="p-2 mx-1 "
								>
									{subject}
								</Badge>
							))}
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
					<CardGroup as={Row} className="my-2">
						<h6 className="text-muted courseCardLabel">Summary</h6>
						<Col sm={8}>
							<Card.Text>{course.summary}</Card.Text>
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
										onClick={() =>
											navigate(
												"/admin/viewInstructor/" +
													instructor._id
											)
										}
										key={"instructor_" + i}
									>
										{instructor.username}
									</Button>
								))}
							</ListGroup>
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
										variant="outline-primary"
										onClick={denyAccess}
									>
										Deny access
									</Button>
									<Button
										className="ms-1"
										variant="outline-primary"
										onClick={grantAccess}
									>
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
