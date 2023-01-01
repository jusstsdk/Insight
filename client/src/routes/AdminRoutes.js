import { Routes, Route } from "react-router-dom";
import AdminView from "../pages/admin/AdminHome";
import CreateAdmin from "../pages/admin/CreateAdmin";
import CreateCorporateTrainee from "../pages/admin/CreateCorporateTrainee";
import CreateInstructor from "../pages/admin/CreateInstructor";
import CourseRequests from "../pages/admin/CourseRequests";
import RequestsHistory from "../pages/admin/RequestsHistory";
import Layout from "../components/shared/Layout";
import Protected from "../components/shared/Protected";
import ViewReports from "../pages/admin/ViewReports";
import ViewCourseReports from "../pages/admin/ViewCourseReports";
import Promotion from "../pages/admin/Promotion";
import ChangePassword from "../components/shared/ChangePassword";
import Refunds from "../pages/admin/Refunds";
import ViewInstructor from "../pages/ViewInstructor";
import CoursePage from "../pages/sharedTrainee/CoursePage";
import Courses from "../pages/sharedTrainee/Courses";
import NotFound from "../pages/NotFound";

export function AdminRoutes() {
	return (
		<>
			<Protected authorizedUserType={"Administrator"}>
				<Routes>
					<Route path="" element={<Layout />}>
						<Route path="" element={<AdminView />} />

						<Route path="createAdmin" element={<CreateAdmin />} />
						<Route
							path="createCorporateTrainee"
							element={<CreateCorporateTrainee />}
						/>
						<Route
							path="changePassword"
							element={<ChangePassword />}
						/>

						<Route
							path="createInstructor"
							element={<CreateInstructor />}
						/>
						<Route
							path="courseRequests"
							element={<CourseRequests />}
						/>
						<Route
							path="requestsHistory"
							element={<RequestsHistory />}
						/>
						<Route path="refunds" element={<Refunds />} />
						<Route path="viewReports" element={<ViewReports />} />
						<Route
							path="viewCourseReports"
							element={<ViewCourseReports />}
						/>
						<Route path="promotion" element={<Promotion />} />
						<Route
							path="viewInstructor/:id"
							element={<ViewInstructor />}
						/>
						<Route path="courses/:id" element={<CoursePage />} />
						<Route path="courses" element={<Courses />} />
						<Route path="viewInstructor/:id" element={<ViewInstructor />} />
						<Route path="*" element={<NotFound />} />
					</Route>
				</Routes>
			</Protected>
		</>
	);
}
