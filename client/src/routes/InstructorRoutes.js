import { Routes, Route } from "react-router-dom";
import InstructorLayout from "../components/instructor/InstructorLayout";
import CreateCourse from "../pages/instructor/CreateCourse";
import EditProfile from "../components/instructor/EditProfile";
import Protected from "../components/Protected";
export function InstructorRoutes() {
	return (
		<>
			<Protected authorizedUserType={"instructor"}>
				<InstructorLayout />
				<Routes>
					<Route path="createCourse" element={<CreateCourse />} />
					<Route path="editProfile" element={<EditProfile />} />
				</Routes>
			</Protected>
		</>
	);
}
