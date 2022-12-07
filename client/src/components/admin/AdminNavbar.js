import {  Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Profile from "../Profile";

function AdminNavbar() {
	const navigate = useNavigate();

	return (
		<>
			<Navbar bg="dark" variant="dark" expand="lg">
				<Container>
					<Navbar.Brand
						href="#"
						onClick={() => {
							navigate("/");
						}}
					>
						Home
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<NavDropdown
								title="Create User"
								id="basic-nav-dropdown"
							>
								<NavDropdown.Item
									onClick={() => {
										navigate("createAdmin");
									}}
								>
									Admin
								</NavDropdown.Item>
								<NavDropdown.Item
									onClick={() => {
										navigate("createCorporateTrainee");
									}}
								>
									Corporate Trainee
								</NavDropdown.Item>
								<NavDropdown.Item
									onClick={() => {
										navigate("createInstructor");
									}}
								>
									Instructor
								</NavDropdown.Item>
							</NavDropdown>
							<Nav.Link href="#link">Reports</Nav.Link>
							<Nav.Link href="#link">Course Requests</Nav.Link>
							<Nav.Link href="#link">Refunds</Nav.Link>
							<Nav.Link href="#link">Discounts</Nav.Link>
						</Nav>
					</Navbar.Collapse>
					<Profile/>
				</Container>
			</Navbar>
		</>
	);
}

export default AdminNavbar;
