import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import Profile from "../Profile";

function GuestNavbar() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// const logoutFunction = async () => {
	// 	localStorage.clear();
	// 	dispatch(logout());
	// 	navigate("/login");
	// };

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
									navigate("courses");
								}}
							>
								Search
							</Nav.Link>
						</Nav>
                    <Profile/>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
}

export default GuestNavbar;
