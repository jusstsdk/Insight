import RequestHistoryCard from "../../components/admin/RequestHistoryCard";
import { useState, useEffect } from "react";
import api from "../../functions/api";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import Pagination from "../../components/shared/pagination/Pagination";
let pageSize = 1;
const RequestsHistory = () => {
	const [traineeRequests, setTraineeRequests] = useState([]);
	const token = useSelector((state) => state.userReducer.token);
	const [currentPage, setCurrentPage] = useState(1);
	let firstPageIndex = (currentPage - 1) * pageSize;
	let lastPageIndex = firstPageIndex + pageSize;
	let currentRequests = traineeRequests.slice(firstPageIndex, lastPageIndex);

	function filterHandledRequests(requests) {
		return (
			requests.filter((request) => request.status.toLowerCase() !== "pending")
				.length > 0
		);
	}

	async function getHandledTrainees() {
		const response = await api.get("/administrators/requests", {
			headers: { authorization: "Bearer " + token },
		});
		const handled = response.data.filter((trainee) =>
			filterHandledRequests(trainee.requests)
		);
		setTraineeRequests(handled);
	}
	useEffect(() => {
		getHandledTrainees();
	}, []);
	return (
		<>
			<h1>Course Requests History</h1>
			<Pagination
				className="pagination-bar"
				currentPage={currentPage}
				totalCount={traineeRequests.length}
				pageSize={pageSize}
				onPageChange={(page) => setCurrentPage(page)}
			/>
			{currentRequests.map((traineeRequests) => (
				<Container key={traineeRequests._id}>
					<h4>{traineeRequests.username}</h4>
					<h5 className="text-muted">{traineeRequests.corporate}</h5>
					{traineeRequests.requests.map((request) => (
						<RequestHistoryCard
							key={request._id}
							request={request}
							course={request.courseId}
						/>
					))}
				</Container>
			))}
		</>
	);
};

export default RequestsHistory;
