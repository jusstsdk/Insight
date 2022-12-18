import { Outlet } from "react-router-dom";

import CustomNavbar from "./CustomNavbar";
import Toaster from "../Toaster";
import { Col, Container, Row } from "react-bootstrap";

export default function Layout() {
	return (
		<>
			<CustomNavbar />
			<Container>
				<Outlet />
			</Container>
			<Toaster />
		</>
	);
}
