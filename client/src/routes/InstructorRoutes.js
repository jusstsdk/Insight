import { Routes, Route } from "react-router-dom";
import InstructorLayout from "../components/instructor/InstructorLayout";
import CreateCourse from "../pages/CreateCourse";
import Protected from "../components/Protected";
export function InstructorRoutes() {
	return (
		<>
			<Protected authorizedUserType={"instructor"}>
				<InstructorLayout />
				<Routes>
					<Route path="createCourse" element={<CreateCourse />} />
				</Routes>
			</Protected>
		</>
	);
}
