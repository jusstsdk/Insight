import { Button, Alert, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";

function CorpTraineeRequestCourseAlert(props) {
	const course = props.course;
	const courseID = course._id;

	const user = useSelector((state) => state.userReducer.user);
	const userID = useSelector((state) => state.userReducer.user._id);

	const dispatch = useDispatch();

	const [loaded, setLoaded] = useState(false);

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
			dispatch(setUser(response.data));
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
		setLoaded(true);
	});

	return (
		loaded && (
			<>
				<Col>
					<Alert variant="primary" className="lead">
						{corpTraineeAlreadyRequestedAccess ? (
							<>
								Request Status:
								<h2>{corpTraineeRequestStatus}</h2>
							</>
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
		)
	);
}

export default CorpTraineeRequestCourseAlert;