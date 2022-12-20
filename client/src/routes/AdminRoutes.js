import { Routes, Route } from "react-router-dom";
import AdminView from "../pages/admin/AdminHome";
import CreateAdmin from "../pages/admin/CreateAdmin";
import CreateCorporateTrainee from "../pages/admin/CreateCorporateTrainee";
import CreateInstructor from "../pages/admin/CreateInstructor";
import CourseRequests from "../pages/admin/CourseRequests";
import RequestsHistory from "../pages/admin/RequestsHistory";
import Layout from "../components/shared/Layout";
import Protected from "../components/shared/Protected";
import Promotion from "../pages/admin/Promotion";

export function AdminRoutes() {
	return (
		<>
			<Protected authorizedUserType={"Administrator"}>
				<Routes>
				<Route path="" element={<Layout />}>
					<Route 
						path="" 
						element={<AdminView />} 
					/>
					<Route path="createAdmin" element={<CreateAdmin />} />
					<Route
						path="createCorporateTrainee"
						element={<CreateCorporateTrainee />}
					/>
					<Route
						path="createInstructor"
						element={<CreateInstructor />}
					/>
					<Route path="courseRequests" element={<CourseRequests />} />
					<Route path="requestsHistory" element={<RequestsHistory />} />
					<Route path="promotion" element={<Promotion />} />
				</Route>
			</Routes>
      </Protected>
		</>
	);
}
