import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import ListCourses from "../SearchCourses";
import CourseCard from "./CourseCard";
function ViewInstructorCourses() {
	const instructorId = useSelector((state) => state.userReducer.user._id);
	const [Courses, setCourses] = useState([]);

	// Gets all Instructor's Review populated with Trainee's information.
	const getCourses = async () => {
		const config = {
			method: "GET",
			url: `http://localhost:4000/api/instructors/${instructorId}/courses`,
		};
		try {
			const response = await axios(config);
			setCourses(response.data.courses);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getCourses();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Container className="my-2">
			<ListCourses setCourses={setCourses} searchInInstructorCourses={true} />
			{Courses.map((course, i) => (
				<CourseCard key={"course_" + i} course={course} />
			))}
		</Container>
	);
}
export default ViewInstructorCourses;
