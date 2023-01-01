import api from "../functions/api";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Col, Tab, Tabs, Container, Button, Card, Row } from "react-bootstrap";
import MyReportCard from "../components/MyReportCard";
const MyReports = () => {
	const [myCoursesReports, setMyCoursesReports] = useState([]);
	const user = useSelector((state) => state.userReducer.user);

	async function getMyReports() {
		const response = await api.get("/reports/authors/" + user._id);
		setMyCoursesReports(response.data);
	}
	useEffect(() => {
		getMyReports();
	}, []);

	return (
		<>
			{myCoursesReports.map((courseReports) => (
				<Card className="mb-3" key={courseReports._id}>
					<Card.Header className="d-flex justify-content-between align-items-center">
						<Col sm={9}>
							<h3>{courseReports.title}</h3>
						</Col>
						<Col sm={1}>
							<h3 className="ms-auto me-2 fitWidth">{courseReports.reports.length}</h3>
						</Col>
					</Card.Header>
					<Card.Body className="d-flex flex-wrap">
						{courseReports.reports.map((report) => (
							<Col sm={5} className="me-3  mb-3">
								<MyReportCard key={report._id} report={report} />
							</Col>
						))}
					</Card.Body>
				</Card>
			))}
		</>
	);
};

export default MyReports;
