import { Outlet } from "react-router-dom";
import GuestNavbar from "./GuestNavbar";

export default function GuestLayout() {
	return (
		<>
			<GuestNavbar />
			<Outlet />
		</>
	);
}
