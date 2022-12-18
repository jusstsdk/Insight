import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function InstructorNavbarButtons() {
	const navigate = useNavigate();
	return (
		<>
			<Nav.Link
				onClick={() => {
					navigate("courses");
				}}>
				Search
			</Nav.Link>
			<Nav.Link
				onClick={() => {
					navigate("createCourse", { state: { status: "New" } });
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
				My Reviews
			</Nav.Link>
			<Nav.Link
				onClick={() => {
					navigate("viewInstructorCourses");
				}}>
				My Courses
			</Nav.Link>
		</>
	);
}
