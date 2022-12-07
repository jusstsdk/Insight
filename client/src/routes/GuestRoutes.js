import { Routes, Route } from "react-router-dom";
import GuestLayout from "../components/guest/GuestLayout";
import GuestView from "../pages/guest/GuestView";
import SignUp from "../pages/SignUp";

export function GuestRoutes() {
	return (
		<>
			<GuestLayout/>
			<Routes>
				<Route path="" element={<GuestView />} />
				<Route path="signUp" element={<SignUp />} />
			</Routes>
		</>
	);
}
