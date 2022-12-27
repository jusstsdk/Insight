import { Routes, Route } from "react-router-dom";
import InstructorHome from "../pages/instructor/InstructorHome";
import CreateCourse from "../pages/instructor/CreateCourse";
import EditProfile from "../pages/instructor/EditProfile";
import ViewInstructorReviews from "../pages/instructor/ViewInstructorReviews";
import ViewInstructorCourses from "../pages/instructor/ViewInstructorCourses";
import Protected from "../components/shared/Protected";
import Layout from "../components/shared/Layout";
import Courses from "../pages/sharedTrainee/Courses";
import Promotion from "../pages/admin/Promotion";
import ViewInstructor from "../pages/ViewInstructor";
import ChangePassword from "../components/shared/ChangePassword";
import MyReports from "../pages/MyReports";
import CoursePage from "../pages/sharedTrainee/CoursePage";

export function InstructorRoutes() {
	return (
		<>
			<Protected authorizedUserType={"Instructor"}>
				<Routes>
					<Route path="" element={<Layout />}>
						<Route path="courses/:id" element={<CoursePage />} />
						<Route path="" element={<InstructorHome />} />
						<Route
							path="courses"
							element={<Courses searchInInstructorCourses={false} />}
						/>
						<Route path="createCourse" element={<CreateCourse />} />
						<Route path="editProfile" element={<EditProfile />} />
						<Route path="changePassword" element={<ChangePassword />} />
						<Route
							path="viewInstructorReviews"
							element={<ViewInstructorReviews />}
						/>
						<Route
							path="viewInstructorCourses"
							element={<ViewInstructorCourses />}
						/>
						<Route path="viewInstructor/:id" element={<ViewInstructor />} />
						<Route path="promotion" element={<Promotion />} />
						<Route path="myReports" element={<MyReports />} />
					</Route>
				</Routes>
			</Protected>
		</>
	);
}
