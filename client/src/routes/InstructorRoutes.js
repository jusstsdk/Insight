import { Routes, Route } from "react-router-dom";
import CreateCourse from "../pages/instructor/CreateCourse";
import EditProfile from "../components/instructor/EditProfile";
import ViewInstructorReviews from "../components/instructor/ViewInstructorReviews";
import ViewInstructorCourses from "../components/instructor/ViewInstructorCourses";
import Protected from "../components/shared/Protected";
import Layout from "../components/shared/Layout";
export function InstructorRoutes() {
	return (
		<>
			<Protected authorizedUserType={"instructor"}>
				<Layout />
				<Routes>
					<Route path="createCourse" element={<CreateCourse />} />
					<Route path="editProfile" element={<EditProfile />} />
					<Route
						path="viewInstructorReviews"
						element={<ViewInstructorReviews />}
					/>
					<Route
						path="viewInstructorCourses"
						element={<ViewInstructorCourses />}
					/>
				</Routes>
			</Protected>
		</>
	);
}
