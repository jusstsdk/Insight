import { Routes, Route } from "react-router-dom";
import CreateAdmin from "../components/admin/CreateAdmin";
import CreateCorporateTrainee from "../components/admin/CreateCorporateTrainee";
import CreateInstructor from "../components/admin/CreateInstructor";
import Promotion from "../components/Promotion";
import Layout from "../components/shared/Layout";
import Protected from "../components/shared/Protected";

export function AdminRoutes() {
	return (
		<>
			<Routes>
				<Route path="" element={<Layout />}>
					<Route path="createAdmin" element={<CreateAdmin />} />
					<Route
						path="createCorporateTrainee"
						element={<CreateCorporateTrainee />}
					/>
					<Route
						path="createInstructor"
						element={<CreateInstructor />}
					/>
					<Route path="promotion" element={<Promotion />} />
				</Route>
			</Routes>
		</>
	);
}
