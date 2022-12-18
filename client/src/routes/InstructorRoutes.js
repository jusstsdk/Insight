import { Routes, Route } from "react-router-dom";
import CreateCourse from "../pages/instructor/CreateCourse";
import EditProfile from "../components/instructor/EditProfile";
import ViewInstructorReviews from "../pages/instructor/ViewInstructorReviews";
import ViewInstructorCourses from "../pages/instructor/ViewInstructorCourses";
import Protected from "../components/shared/Protected";
import Layout from "../components/shared/Layout";
import Courses from "../pages/sharedTrainee/Courses";
import Promotion from "../pages/admin/Promotion";
export function InstructorRoutes() {
	return (
		<>
			<Protected authorizedUserType={"Instructor"}>
				<Routes>
					<Route path="" element={<Layout />}>
						<Route
							path="courses"
							element={
								<Courses searchInInstructorCourses={false} />
							}
						/>
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
						<Route path="promotion" element={<Promotion />} />
					</Route>
				</Routes>
			</Protected>
		</>
	);
}
