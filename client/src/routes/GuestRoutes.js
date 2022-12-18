import { Routes, Route } from "react-router-dom";
import Layout from "../components/shared/Layout";
import ForgotPassword from "../pages/guest/ForgotPassword";
import GuestView from "../pages/guest/GuestView";
import ResetPassword from "../pages/guest/ResetPassword";
import Courses from "../pages/sharedTrainee/Courses";
import SignUp from "../pages/SignUp";

export function GuestRoutes() {
	return (
		<>
			<Routes>
				<Route path="" element={<Layout />}>
					<Route path="" element={<GuestView />} />
					<Route path="signUp" element={<SignUp />} />
					<Route path="courses" element={<Courses />} />
					<Route path="forgotPassword" element={<ForgotPassword />} />
					<Route path="resetPassword" element={<ResetPassword />} />
				</Route>
			</Routes>
		</>
	);
}
