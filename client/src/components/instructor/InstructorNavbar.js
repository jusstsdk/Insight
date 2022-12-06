import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

function InstructorNavbar() {
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
							<Nav.Link
								onClick={() => {
									navigate("createCourse");
								}}
							>
								Create Course
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
					<Button onClick={() => logoutFunction()}>Logout</Button>
				</Container>
			</Navbar>
		</>
	);
}

export default InstructorNavbar;
