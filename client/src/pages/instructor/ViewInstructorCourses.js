import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { useSelector } from "react-redux";
import ListCourses from "../../components/SearchCourses";
import CourseCard from "../../components/instructor/CourseCard";
function ViewInstructorCourses() {
	const instructorId = useSelector((state) => state.userReducer.user._id);
	const [Courses, setCourses] = useState([]);
	const [Drafts, setDrafts] = useState([]);
	const [Published, setPublished] = useState([]);
	const [Closed, setClosed] = useState([]);
	const [DetectChange, setDetectChange] = useState(false);
	// Gets all Instructor's Review populated with Trainee's information.
	const getCourses = async () => {
		const config = {
			method: "GET",
			url: `http://localhost:4000/api/instructors/${instructorId}/courses`,
		};
		try {
			const response = await axios(config);
			let courses = response.data.courses;
			let drafts = courses.filter((course) => course.status === "Draft");
			let publishedCourses = courses.filter((course) => course.status === "Published");
			let closedCourses = courses.filter((course) => course.status === "Closed");
			setCourses(courses);
			setDrafts(drafts);
			setPublished(publishedCourses);
			setClosed(closedCourses);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getCourses();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [DetectChange]);

	return (
		<Container className="my-2">
			<ListCourses setCourses={setCourses} searchInInstructorCourses={true} />
			<Tabs id="controlled-tab-example" defaultActiveKey="AllCourses" className="mb-3">
				<Tab eventKey="AllCourses" title="All Courses">
					{Courses.map((course, i) => (
						<CourseCard
							key={"course_" + i}
							course={course}
							DetectChange={DetectChange}
							setDetectChange={setDetectChange}
							allCourses={true}
						/>
					))}
				</Tab>
				<Tab eventKey="Drafts" title="Drafts">
					{Drafts.map((course, i) => (
						<CourseCard
							key={"course_" + i}
							course={course}
							DetectChange={DetectChange}
							setDetectChange={setDetectChange}
						/>
					))}
				</Tab>
				<Tab eventKey="Published" title="Published">
					{Published.map((course, i) => (
						<CourseCard
							key={"course_" + i}
							course={course}
							DetectChange={DetectChange}
							setDetectChange={setDetectChange}
						/>
					))}
				</Tab>
				<Tab eventKey="Closed" title="Closed">
					{Closed.map((course, i) => (
						<CourseCard
							key={"course_" + i}
							course={course}
							DetectChange={DetectChange}
							setDetectChange={setDetectChange}
						/>
					))}
				</Tab>
			</Tabs>
		</Container>
	);
}
export default ViewInstructorCourses;
