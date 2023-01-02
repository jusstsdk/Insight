import { Button, Col, Form, Modal } from "react-bootstrap";
import { useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { addNotification } from "../../redux/notificationsSlice";
import Multiselect from "multiselect-react-dropdown";

function ReportCourseModal(props) {
	const course = props.course;
	const showReportCourseModal = props.showReportCourseModal;
	const setShowReportCourseModal = props.setShowReportCourseModal;

	const courseID = course._id;

	const dispatch = useDispatch();

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
				type: reportType,
				description: reportDescription.current.value,
				author: userID,
				authorType: userType,
			},
		};
		handleCloseReportCourseModal();
		try {
			let response = await axios(config);
			dispatch(
				addNotification({
					title: "Issue Reported",
					info: "Report has been sent.",
					color: "success",
				})
			);
		} catch (err) {
			dispatch(
				addNotification({
					title: "Error",
					info: err.data,
					color: "error",
				})
			);
		}
	}

	return (
		<Modal show={showReportCourseModal} onHide={handleCloseReportCourseModal}>
			<Modal.Header closeButton>
				<Modal.Title>Report Issue with the Course</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group className="mb-3">
						<Form.Label>Title</Form.Label>
						<Form.Control ref={reportTitle} type="text" placeholder="Title of report." />
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Type</Form.Label>
						<Col sm={4}>
							<Multiselect
								id="singleSelectSubjects"
								options={["Technical", "Financial", "Other"]}
								selectedValues={[reportType]}
								onSelect={(_, selectedItem) => {
									setReportType(selectedItem);
								}}
								singleSelect={true}
								isObject={false}
								placeholder="Select Subject Filter"
								closeOnSelect={true}
								showArrow={true}
								avoidHighlightFirstOption={true}
								hidePlaceholder={true}
							/>
						</Col>
					</Form.Group>
					<Form.Group className="">
						<Form.Label>Description</Form.Label>
						<Form.Control
							as="textarea"
							ref={reportDescription}
							placeholder="Description"
							rows={3}
							style={{ height: "100px" }}
						/>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleCloseReportCourseModal}>
					Cancel
				</Button>
				<Button variant="primary" onClick={submitReport}>
					Submit
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ReportCourseModal;
