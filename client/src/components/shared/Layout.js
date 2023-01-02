import { Outlet } from "react-router-dom";

import CustomNavbar from "./CustomNavbar";
import { Col, Container, Row } from "react-bootstrap";

export default function Layout() {
	return (
		<>
			<CustomNavbar />
			<Container className="my-3">
				<Outlet />
			</Container>
		</>
	);
}
