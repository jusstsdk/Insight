import { useEffect, useState } from "react";
import { Col, Container } from "react-bootstrap";
import axios from "axios";
import CourseReportsCard from "../../components/admin/CourseReportsCard";

function ViewReports() {
	const [Courses, setCourses] = useState([]);
	const getReports = async () => {
		const config = {
			method: "GET",
			url: `http://localhost:4000/api/reports/`,
		};
		try {
			const response = await axios(config);
			setCourses(response.data);
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		getReports();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<Container className="my-2 d-flex flex-wrap">
			{console.log(Courses)}
			{Courses.map((course, i) => (
				<Col sm={3} className="mb-2 me-2">
					<CourseReportsCard course={course} />
				</Col>
			))}
		</Container>
	);
}
export default ViewReports;
