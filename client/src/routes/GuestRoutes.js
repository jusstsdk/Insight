import { Routes, Route } from "react-router-dom";
import GuestLayout from "../components/guest/GuestLayout";
import GuestView from "../pages/guest/GuestView";

export function GuestRoutes() {
	return (
		<>
			<GuestLayout/>
			<Routes>
				<Route path="" element={<GuestView />} />
			</Routes>
		</>
	);
}
