import { Button, Row } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setRequests } from "../../redux/userSlice";
import { addNotification } from "../../redux/notificationsSlice";

function CorpTraineeRequestCourseAlert(props) {
	const course = props.course;
	const courseID = course._id;

	const user = useSelector((state) => state.userReducer.user);
	const userID = useSelector((state) => state.userReducer.user._id);

	const dispatch = useDispatch();

	const [loaded, setLoaded] = useState(false);

	//CorpTrainee Data
	const [corpTraineeAlreadyRequestedAccess, setCorpTraineeAlreadyRequestedAccess] = useState(false);
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
			dispatch(setRequests(response.data.requests));
			//setCorpTraineeAlreadyRequestedAccess(true);
		} catch (err) {
			console.log(err);
		}

		dispatch(
			addNotification({
				title: "Request Sent",
				info:
					"Access request to " + course.title + " was sent successfully,waiting for admin approval",
				color: "success",
			})
		);
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
			<div className="fitWidth">
				{corpTraineeAlreadyRequestedAccess ? (
					<Row>
						<h5 className="fitWidth">Request Status:</h5>
						<h5 className="lead fitWidth ps-0">{corpTraineeRequestStatus}</h5>
					</Row>
				) : (
					<Button variant="success" onClick={corpTraineeRequestAccessToCourse}>
						Request Course
					</Button>
				)}
			</div>
		)
	);
}

export default CorpTraineeRequestCourseAlert;
