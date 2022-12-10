import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function InstructorNavbarButtons() {
	const navigate = useNavigate();
	return (
		<>
			<Nav.Link
				onClick={() => {
					navigate("createCourse");
				}}>
				Create Course
			</Nav.Link>
			<Nav.Link
				onClick={() => {
					navigate("editProfile");
				}}>
				Edit Profile
			</Nav.Link>
			<Nav.Link
				onClick={() => {
					navigate("viewInstructorReviews");
				}}>
				View Reviews
			</Nav.Link>
			<Nav.Link
				onClick={() => {
					navigate("viewInstructorCourses");
				}}>
				View Courses
			</Nav.Link>
		</>
	);
}
