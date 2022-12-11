import { Outlet } from "react-router-dom";

import CustomNavbar from "./CustomNavbar";
import Toaster from "../Toaster";

export default function Layout() {
	return (
		<>
			<CustomNavbar />
			<Outlet />
			<Toaster />
		</>
	);
}
