import { Routes, Route } from "react-router-dom";
import CreateAdmin from "../components/admin/CreateAdmin";
import CreateCorporateTrainee from "../components/admin/CreateCorporateTrainee";
import CreateInstructor from "../components/admin/CreateInstructor";
import Layout from "../components/shared/Layout";
import Protected from "../components/shared/Protected";

export function AdminRoutes() {
	return (
		<>
			<Protected authorizedUserType={"administrator"}>
				<Layout />
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
