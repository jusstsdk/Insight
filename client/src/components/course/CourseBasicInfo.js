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
import { useParams } from "react-router-dom";

function CourseBasicInfo(course, url, instructors) {
	const userID = useSelector((state) => state.userReducer.user._id);
	const userType = useSelector((state) => state.userReducer.type);

	const reportTitle = useRef();
	const reportDescription = useRef();

	//TO SHOW OR HIDE MODAL OF REPORT COURSE
	const [showReportBox, setShow] = useState(false);
	const [reportType, setReportType] = useState("Technical");
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	//REPORT DATA

	async function submitReport() {
		let config = {
			method: "POST",
			url: `http://localhost:4000/api/reports/courses/${course._id}`,
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

	return (
		<>
			<Row>
				<Col>
					<Alert variant="primary" className="lead">
						Price: {course.price} instead of <del>{course.originalPrice}</del>
						!!! {course.discount}% Discount! For limited time only
						<Button variant="danger">Buy</Button>
					</Alert>
				</Col>
				<Col>
					<Alert variant="dark" className="lead">
						Hours: {course.hours ? course.hours : 999}
					</Alert>
				</Col>
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
							<ListGroup.Item key={instructor._id + ""} bg="primary">
								{instructor.username}
							</ListGroup.Item>
						);
					})}
			</ListGroup>
			<Button onClick={handleShow}>Report Course</Button>

			<Modal show={showReportBox} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Report a Course</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3" controlId="reportTitle">
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
								onChange={(e) => setReportType(e.target.value)}
							>
								<option>Technical</option>
								<option>Financial</option>
								<option>Other</option>
							</select>
						</Form.Group>
						<Form.Group className="mb-3" controlId="reportDescription">
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
	);
}

export default CourseBasicInfo;
