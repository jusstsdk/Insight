import { Route, Routes } from "react-router-dom";
import InstructorHome from "../pages/InstrcutorHome";
import CreateCourse from "../pages/CreateCourse";
function InstructorView() {
	return (
		<Routes>
			<Route path="/" element={<InstructorHome />} />
			<Route path="/createCourse" element={<CreateCourse />} />
		</Routes>
	);
}

export default InstructorView;
