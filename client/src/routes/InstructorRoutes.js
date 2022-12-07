import { Routes, Route } from "react-router-dom";
import InstructorLayout from "../components/instructor/InstructorLayout";
import CreateCourse from "../pages/instructor/CreateCourse";
import EditProfile from "../components/instructor/EditProfile";
import ViewInstructorReviews from "../components/instructor/ViewInstructorReviews";
import ViewInstructorCourses from "../components/instructor/ViewInstructorCourses";
import Protected from "../components/Protected";
export function InstructorRoutes() {
	return (
		<>
			<Protected authorizedUserType={"instructor"}>
				<InstructorLayout />
				<Routes>
					<Route path="createCourse" element={<CreateCourse />} />
					<Route path="editProfile" element={<EditProfile />} />
					<Route path="viewInstructorReviews" element={<ViewInstructorReviews />} />
					<Route path="viewInstructorCourses" element={<ViewInstructorCourses />} />
				</Routes>
			</Protected>
		</>
	);
}
