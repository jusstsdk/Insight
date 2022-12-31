import RequestCard from "../../components/admin/RequestCard";
import Pagination from "../../components/shared/pagination/Pagination";
import { useState, useEffect } from "react";
import api from "../../functions/api";
import { Container, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
let pageSize = 1;
const CourseRequests = () => {
	const [traineeRequests, setTraineeRequests] = useState([]);
	const [DetectChange, setDetectChange] = useState(false);
	const token = useSelector((state) => state.userReducer.token);
	const [currentPage, setCurrentPage] = useState(1);
	let firstPageIndex = (currentPage - 1) * pageSize;
	if(traineeRequests.length !== 0){
		if(firstPageIndex > traineeRequests.length - 1){
			setCurrentPage(currentPage - 1);
		}
	}

	let lastPageIndex = firstPageIndex + pageSize;
	let currentRequests = traineeRequests.slice(firstPageIndex, lastPageIndex);

	function filterPendingRequests(requests) {
		return requests.filter((request) => request.status.toLowerCase() === "pending").length>0;
	}
	
	async function getPendingTrainees() {	
		const response = await api.get("/administrators/requests",{
			headers: { authorization: "Bearer " + token }
		});
		const pending = response.data.filter((trainee) => filterPendingRequests(trainee.requests));
		setTraineeRequests(pending);
		
	}
	useEffect(() => {
		getPendingTrainees();
	}, [DetectChange]);
	
	return (
		<>
			<h1>Course Requests</h1>
			<Pagination
					className="pagination-bar"
					currentPage={currentPage}
					totalCount={traineeRequests.length}
					pageSize={pageSize}
					onPageChange={(page) => setCurrentPage(page)}
				/>
			{currentRequests.map((traineeRequests) => (
				<Container  key={traineeRequests._id}>
					<h4>{traineeRequests.username}</h4>
					<h6 className="text-muted">{traineeRequests.corporate}</h6>
					{traineeRequests.requests.map((request) => (
						
						<RequestCard key={request._id} request={request} course={request.courseId} username={traineeRequests.username} DetectChange={DetectChange} setDetectChange={setDetectChange} />
					))}
				</Container>
			))}
			
		</>
	);
};

export default CourseRequests;
