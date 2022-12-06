import { Routes, Route } from "react-router-dom";
import AdminLayout from "../components/admin/AdminLayout";
import CreateAdmin from "../components/admin/CreateAdmin";
import CreateCorporateTrainee from "../components/admin/CreateCorporateTrainee";
import CreateInstructor from "../components/admin/CreateInstructor";
import Protected from "../components/Protected";

export function AdminRoutes() {
	return (
		<>
			<Protected authorizedUserType={"admin"}>
				<AdminLayout />
				<Routes>
					<Route path="createAdmin" element={<CreateAdmin />} />
					<Route
						path="createCorporateTrainee"
						element={<CreateCorporateTrainee />}
					/>
					<Route
						path="createInstructor"
						element={<CreateInstructor />}
					/>
				</Routes>
			</Protected>
		</>
	);
}
