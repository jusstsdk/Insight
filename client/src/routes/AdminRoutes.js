import { Routes, Route } from "react-router-dom";
import CreateAdmin from "../components/admin/CreateAdmin";
import CreateCorporateTrainee from "../components/admin/CreateCorporateTrainee";
import CreateInstructor from "../components/admin/CreateInstructor";
import Layout from "../components/shared/Layout";
import Protected from "../components/shared/Protected";
import ViewReports from "../pages/admin/ViewReports";
import ViewCourseReports from "../pages/admin/ViewCourseReports";

export function AdminRoutes() {
	return (
		<>
			<Protected authorizedUserType={"Administrator"}>
				<Layout />
				<Routes>
					<Route path="createAdmin" element={<CreateAdmin />} />
					<Route
						path="createCorporateTrainee"
						element={<CreateCorporateTrainee />}
					/>
					<Route path="createInstructor" element={<CreateInstructor />} />
					<Route path="viewReports" element={<ViewReports />} />
					<Route path="viewCourseReports" element={<ViewCourseReports />} />
				</Routes>
			</Protected>
		</>
	);
}
