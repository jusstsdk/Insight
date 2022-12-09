import { Routes, Route } from "react-router-dom";
import Layout from "../components/shared/Layout";
import GuestView from "../pages/guest/GuestView";
import SignUp from "../pages/SignUp";

export function GuestRoutes() {
	return (
		<>
			<Layout />
			<Routes>
				<Route path="" element={<GuestView />} />
				<Route path="signUp" element={<SignUp />} />
			</Routes>
		</>
	);
}
