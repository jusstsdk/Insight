import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

function AdminNavbar() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const logoutFunction = async () => {
		localStorage.clear();
		dispatch(logout());
		navigate("/login");
	};

	return (
		<>
			<Navbar bg="dark" variant="dark" expand="lg">
				<Container>
					<Navbar.Brand
						onClick={() => {
							navigate("/home");
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
										navigate("/createAdmin");
									}}
								>
									Admin
								</NavDropdown.Item>
								<NavDropdown.Item
									onClick={() => {
										navigate("/createCorporateTrainee");
									}}
								>
									Corporate Trainee
								</NavDropdown.Item>
								<NavDropdown.Item
									onClick={() => {
										navigate("/createInstructor");
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
					<Button onClick={() => logoutFunction()}>Logout</Button>
				</Container>
			</Navbar>
		</>
	);
}

export default AdminNavbar;
