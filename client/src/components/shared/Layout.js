import { Outlet } from "react-router-dom";

import CustomNavbar from "./CustomNavbar";
import Toaster from "../Toaster";
import { Col, Container, Row } from "react-bootstrap";

export default function Layout() {
	return (
		<>
			<CustomNavbar />
			<Container>
				<Row className="justify-content-md-center">
					<Col xs={10}>
						<Outlet />
					</Col>
				</Row>
			</Container>
			<Toaster />
		</>
	);
}
