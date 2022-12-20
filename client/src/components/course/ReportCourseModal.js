import { Button, Form, Modal } from "react-bootstrap";
import { useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function ReportCourseModal(props) {
	const course = props.course;
	const showReportCourseModal = props.showReportCourseModal;
	const setShowReportCourseModal = props.setShowReportCourseModal;
	const newId = props.newId;

	const courseID = course._id;

	//GET USER ID AND TYPE FOR WHEN REPORTING
	const userID = useSelector((state) => state.userReducer.user._id);
	const userType = useSelector((state) => state.userReducer.type);

	const [reportType, setReportType] = useState("Technical");
	const handleCloseReportCourseModal = () => setShowReportCourseModal(false);

	//REPORT DATA
	const reportTitle = useRef();
	const reportDescription = useRef();

	async function submitReport() {
		let config = {
			method: "POST",
			url: `http://localhost:4000/api/reports/courses/${courseID}`,
			data: {
				title: reportTitle.current.value,
				type: reportType.toLowerCase(),
				description: reportDescription.current.value,
				author: userID,
				authorType: userType,
			},
		};
		handleCloseReportCourseModal();
		try {
			let response = await axios(config);
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<>
			<Modal
				key={newId()}
				show={showReportCourseModal}
				onHide={handleCloseReportCourseModal}
			>
				<Modal.Header key={newId()} closeButton>
					<Modal.Title key={newId()}>Report Course</Modal.Title>
				</Modal.Header>
				<Modal.Body key={newId()}>
					<Form key={newId()}>
						<Form.Group key={newId()} className="mb-3" controlId="reportTitle">
							<Form.Label key={newId()}>Title</Form.Label>
							<Form.Control
								key={newId()}
								ref={reportTitle}
								type="text"
								placeholder="Title of report."
							/>
						</Form.Group>
						<Form.Group key={newId()}>
							<select
								value={reportType}
								onChange={(e) => setReportType(e.target.value)}
							>
								<option>Technical</option>
								<option>Financial</option>
								<option>Other</option>
							</select>
						</Form.Group>
						<Form.Group
							key={newId()}
							className="mb-3"
							controlId="reportDescription"
						>
							<Form.Label key={newId()}>Description</Form.Label>
							<Form.Control
								key={newId()}
								ref={reportDescription}
								placeholder="Description"
								rows={3}
								style={{ height: "100px" }}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer key={newId()}>
					<Button
						key={newId()}
						variant="secondary"
						onClick={handleCloseReportCourseModal}
					>
						Cancel
					</Button>
					<Button key={newId()} variant="primary" onClick={submitReport}>
						Submit
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default ReportCourseModal;
