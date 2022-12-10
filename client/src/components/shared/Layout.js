import { Outlet } from "react-router-dom";
import CustomNavbar from "./CustomNavbar";

export default function Layout() {
	return (
		<>
			<CustomNavbar />
			<Outlet />
		</>
	);
}
