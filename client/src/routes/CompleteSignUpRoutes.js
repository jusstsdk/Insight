import { Route, Routes } from "react-router-dom";
import Layout from "../components/shared/Layout";
import { RedirectToHome } from "../components/shared/RedirectToHome";
import CompleteSignUp from "../pages/CompleteSignUp";

export function CompleteSignUpRoutes() {
	return (
		<>
			<Routes>
				<Route path="" element={<Layout />}>
					<Route path="" element={<CompleteSignUp />} />
					<Route path="*" element={<RedirectToHome />} />
				</Route>
			</Routes>
		</>
	);
}
