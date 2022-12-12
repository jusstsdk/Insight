import RequestCard from "../../components/admin/RequestCard";
import { useState, useEffect } from "react";
import api from "../../functions/api";
import { Container } from "react-bootstrap";
const CourseRequests = () => {
	const [requests, setRequests] = useState([]);
	async function getRequests() {
		const response = await api.get("/administrators/requests");
		setRequests(response.data);
	}
	useEffect(() => {
		getRequests();
	}, []);
	return (
		<>
			<h1>Course Requests</h1>
			{requests.map((traineeRequests) => (
				<Container key={traineeRequests._id}>
					<h1>{traineeRequests.username}</h1>
					<h2>{traineeRequests.corporate}</h2>
					{traineeRequests.requests.map((request) => (
						<RequestCard key={request._id} request={request} course={request.courseId} traineeId={traineeRequests._id} />
					))}
				</Container>
			))}
		</>
	);
};

export default CourseRequests;
