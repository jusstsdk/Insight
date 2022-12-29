import RequestCard from "../../components/admin/RequestCard";
import { useState, useEffect } from "react";
import api from "../../functions/api";
import { Container, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
const CourseRequests = () => {
	const [traineeRequests, setTraineeRequests] = useState([]);
	const token = useSelector((state) => state.userReducer.token);

	function filterPendingRequests(requests) {
		return (
			requests.filter((request) => request.status.toLowerCase() === "pending")
				.length > 0
		);
	}

	async function getPendingTrainees() {
		const response = await api.get("/administrators/requests", {
			headers: { authorization: "Bearer " + token },
		});
		const pending = response.data.filter((trainee) =>
			filterPendingRequests(trainee.requests)
		);
		setTraineeRequests(pending);
	}
	useEffect(() => {
		getPendingTrainees();
	}, []);
	return (
		<>
			<h1>Course Requests</h1>

			{traineeRequests.map((traineeRequests) => (
				<Container variant="light" key={traineeRequests._id}>
					<h4>{traineeRequests.username}</h4>
					<h6 className="text-muted">{traineeRequests.corporate}</h6>
					{traineeRequests.requests.map((request) => (
						<RequestCard
							key={request._id}
							request={request}
							course={request.courseId}
							username={traineeRequests.username}
						/>
					))}
				</Container>
			))}
		</>
	);
};

export default CourseRequests;
