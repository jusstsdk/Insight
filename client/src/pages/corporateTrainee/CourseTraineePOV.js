import {
	Button,
	Form,
	Card,
	Badge,
	Alert,
	ListGroup,
	Tabs,
	Tab,
	Container,
	Row,
	Col,
	Table,
	Modal,
} from "react-bootstrap";
import { useRef } from "react";
import axios from "axios";
import API from "../../functions/api";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from "react-router-dom";

function CourseTraineePOV() {
	//current course ID (STATIC FOR NOW)
	const navigate = useNavigate();
	const params = useParams();
	let id = params.id;
	const [loaded, setLoaded] = useState(false);

	//PREVIEW VIDEO URL, HERE BECAUSE IM IDIOT SHOULD BE MOVED DOWN
	let url;

	//GET USER ID AND TYPE FOR WHEN REPORTING ETC
	const userID = useSelector((state) => state.userReducer.user._id);
	const userType = useSelector((state) => state.userReducer.type);
	const trainee = useSelector((state) => state.userReducer.user);

	//COURSE STATE
	const [course, setCourse] = useState();
	const [instructors, setInstructors] = useState();

	async function getCourseFromDB() {
		const response = await API.get(`courses/${id}`);

		url = response.data.previewVideo;

		let tempInstructors = [];
		response.data.instructors.map(async (instructor) => {
			try {
				const response = await API(`instructors/${instructor}`);

				tempInstructors = [...tempInstructors, response.data];

				setInstructors(tempInstructors);
			} catch (err) {
				console.log(err);
			}
		});
		setCourse(response.data);
	}

	//to handle button of request course
	const [clickable, setClickable] = useState(true);
	const [buttonText, setButtonText] = useState("");
	const [showRequestAccess, setShowRequestAccess] = useState(false);
	const [showBuyCourse, setShowBuyCourse] = useState(false);

	//TO SHOW OR HIDE MODAL OF REPORT COURSE
	const [showReportBox, setShow] = useState(false);

	const [reportType, setReportType] = useState("Technical");
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	//REPORT DATA
	const reportTitle = useRef();
	const reportDescription = useRef();

	async function submitReport() {
		let config = {
			method: "POST",
			url: `http://localhost:4000/api/reports/courses/${id}`,
			data: {
				title: reportTitle.current.value,
				type: reportType,
				description: reportDescription.current.value,
				author: userID,
				authorType: userType,
			},
		};
		setShow(false);
		try {
			let response = await axios(config);
		} catch (err) {
			console.log(err);
		}
	}
	async function handleRequestAccess() {
		let config = {
			method: "POST",
			url: `http://localhost:4000/api/corporateTrainees/${userID}/request`,
			data: {
				courseId: id,
			},
		};
		setClickable(false);
		setButtonText("Request pending");
		try {
			let response = await axios(config);
		} catch (err) {
			console.log(err);
		}
	}
	async function handleBuyCourse() {
		navigate("payment");
	}
	//SHOW INSTRUCTORS DATA IN COURSE PAGE
	async function loadDoc() {
		await getCourseFromDB();

		if (userType === "corporateTrainee") {
			let ShowRequestAccessTemp = true;
			setShowRequestAccess(true);
			setButtonText("Request Access");
			trainee.courses.some((course) => {
				if (course.course === id) {
					setShowRequestAccess(false);
					return true;
				}
				return false;
			});

			if (ShowRequestAccessTemp) {
				trainee.requests.forEach((request) => {
					if (request.courseId === id) {
						setClickable(false);
						setButtonText("Request pending");
					}
				});
			}
		} else {
			setShowBuyCourse(true);
			setButtonText("Buy Course");
			trainee.courses.some((course) => {
				if (course.course === id) {
					setShowBuyCourse(false);
					return true;
				}
				return false;
			});
		}
		setLoaded(true);
	}

	useEffect(() => {
		loadDoc();
	}, []);

	return (
		loaded &&
		course && (
			<>
				<Container>
					<Row>
						<Col>
							<h1 className="lead">{course.title}</h1>
						</Col>
						<Col>
							{course.subjects.map((s) => {
								return (
									<Badge
										key={s}
										bg="primary"
										className="lead"
									>
										{s}
									</Badge>
								);
							})}
						</Col>
					</Row>
					<Tabs
						defaultActiveKey="basicInfo"
						id="uncontrolled-tab-example"
						className="mb-3"
					>
						<Tab
							key="basicInfo"
							eventKey="basicInfo"
							title="Basic Info"
						>
							<Row>
								{showBuyCourse && (
									<Col>
										<Alert
											variant="primary"
											className="lead"
										>
											Price: {course.price} instead of{" "}
											<del>{course.originalPrice}</del>
											!!! {course.discount}% Discount! For
											limited time only
											<Button
												disabled={!clickable}
												variant="success"
												onClick={handleBuyCourse}
											>
												{buttonText}
											</Button>
										</Alert>
									</Col>
								)}

								<Col>
									<Alert variant="dark" className="lead">
										Hours:{" "}
										{course.hours ? course.hours : 50}
									</Alert>
								</Col>
								{showRequestAccess && (
									<Col>
										<Alert variant="light" className="lead">
											<Button
												disabled={!clickable}
												variant="success"
												onClick={handleRequestAccess}
											>
												{buttonText}
											</Button>
										</Alert>
									</Col>
								)}
							</Row>
							<Row>
								<Col>
									<h3 className="lead">{course.summary}</h3>
								</Col>
								<Col>
									<h3 className="lead">Preview Video</h3>
									<iframe
										width="560"
										height="315"
										src={url}
										title="Preview Video"
										allowFullScreen
									/>
								</Col>
							</Row>

							<h4 className="lead">Instructors:</h4>
							<ListGroup key="Group " variant="flush">
								{instructors &&
									instructors.map((instructor) => {
										return (
											<ListGroup.Item
												key={instructor._id + ""}
												bg="primary"
											>
												{instructor.username}
											</ListGroup.Item>
										);
									})}
							</ListGroup>
							<Button onClick={handleShow}>Report Course</Button>
						</Tab>
						<Tab
							key="subtititles"
							eventKey="subtitles"
							title="Subtitles"
						>
							<Table striped>
								<thead>
									<tr>
										<th>#</th>
										<th>Title</th>
										<th>Hours</th>
									</tr>
								</thead>
								<tbody>
									{course.subtitles.map((s, index) => {
										return (
											<tr>
												<td>{index + 1}</td>
												<td>
													{s.title
														? s.title
														: "No Title."}
												</td>
												<td>{s.hours}</td>
												<td>
													<Button>View</Button>
												</td>
											</tr>
										);
									})}
								</tbody>
							</Table>
							<Button>Start Exam</Button>
						</Tab>
						<Tab key="reviews" eventKey="reviews" title="Reviews">
							<Button>Add a review</Button>
							{course.reviews.map((s, index) => {
								return (
									<Card key={s.trainee}>
										<Card.Img />
										<Card.Body>
											<Card.Title>
												<Row>
													<Col> {s.trainee}</Col>
													<Col>{s.rating}</Col>
												</Row>
											</Card.Title>
											<Card.Text>{s.review}</Card.Text>
										</Card.Body>
									</Card>
								);
							})}
						</Tab>
					</Tabs>
				</Container>

				<Modal show={showReportBox} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Report a Course</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Group
								className="mb-3"
								controlId="reportTitle"
							>
								<Form.Label>Title</Form.Label>
								<Form.Control
									ref={reportTitle}
									type="text"
									placeholder="Title of report."
								/>
							</Form.Group>
							<Form.Group>
								<select
									value={reportType}
									onChange={(e) =>
										setReportType(e.target.value)
									}
								>
									<option>Technical</option>
									<option>Financial</option>
									<option>Other</option>
								</select>
							</Form.Group>
							<Form.Group
								className="mb-3"
								controlId="reportDescription"
							>
								<Form.Label>Description</Form.Label>
								<Form.Control
									ref={reportDescription}
									placeholder="Description"
									rows={3}
									style={{ height: "100px" }}
								/>
							</Form.Group>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Cancel
						</Button>
						<Button variant="primary" onClick={submitReport}>
							Submit
						</Button>
					</Modal.Footer>
				</Modal>
			</>
		)
	);
}
export default CourseTraineePOV;
