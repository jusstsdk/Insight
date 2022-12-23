import { useState, useEffect } from "react";
import API from "../../functions/api";
import { Container, Badge,CardGroup,Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import RefundCard from "../../components/admin/RefundCard";

const Refunds = () => {
	const [refundCourses, setRefundCourses] = useState([]);
    const token = useSelector((state) => state.userReducer.token);

	async function getRefundCourses() {
		const response = await API.get("/administrators/refunds",{
			headers: { authorization: "Bearer " + token }
		});
        
		setRefundCourses(response.data);
        
	}

	useEffect(() => {
		getRefundCourses();
        
	}, []);
	return (
		<>
			<h1>Refund Requests</h1>
			{refundCourses.map((course) => (
				<Container key={course._id}>
					<h4>{course.title}</h4>
					{course.subjects.map((subject, i) => (
						<Badge key={"subject_badge_" + i} className="p-2 mx-1 ">
							{subject}
						</Badge>
					))}
					<Row xs={1} md={2} lg={3}   className="g-2">
					{course.refundRequests.map((request) => (
						<RefundCard
							key={request._id}
							request={request}  
                            course = {course}         
						/>
					))}
                    </Row>
				</Container>
			))}
		</>
	);
};

export default Refunds;
