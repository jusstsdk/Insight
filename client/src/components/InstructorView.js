import { Route, Routes } from "react-router-dom";
import InstructorHome from "../pages/instructor/InstrcutorHome";
import CreateCourse from "../pages/instructor/CreateCourse";
import React from "react";
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
