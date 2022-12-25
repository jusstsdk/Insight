import { Button, Alert, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function CorpTraineeRequestCourseAlert(props) {
	const course = props.course;
	const courseID = course._id;

	const user = useSelector((state) => state.userReducer.user);
	const userID = useSelector((state) => state.userReducer.user._id);

	//CorpTrainee Data
	const [
		corpTraineeAlreadyRequestedAccess,
		setCorpTraineeAlreadyRequestedAccess,
	] = useState(false);
	const [corpTraineeRequestStatus, setCorpTraineeRequestStatus] = useState();

	async function corpTraineeRequestAccessToCourse() {
		let config = {
			method: "POST",
			url: `http://localhost:4000/api/corporateTrainees/${userID}/request`,
			data: {
				courseId: courseID,
			},
		};

		try {
			let response = await axios(config);
			console.log(response);
			setCorpTraineeAlreadyRequestedAccess(true);
		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		user.requests.forEach((request) => {
			if (request.courseId === courseID) {
				setCorpTraineeAlreadyRequestedAccess(true);
				setCorpTraineeRequestStatus(request.status);
			}
		});
	});

	return (
		<>
			<Col>
				<Alert variant="primary" className="lead">
					{corpTraineeAlreadyRequestedAccess ? (
						<h1>Request Status: {corpTraineeRequestStatus}</h1>
					) : (
						<Button
							variant="success"
							onClick={corpTraineeRequestAccessToCourse}
						>
							Request Course
						</Button>
					)}
				</Alert>
			</Col>
		</>
	);
}

export default CorpTraineeRequestCourseAlert;
