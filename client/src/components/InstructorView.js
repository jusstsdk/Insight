import { useNavigate } from "react-router-dom";

function InstructorView() {
	const navigate = useNavigate();

	return (
		<>
			<h1>Instructor View</h1>
			<button onClick={() => navigate("/createCourse")}>Create Course</button>
		</>
	);
}

export default InstructorView;
