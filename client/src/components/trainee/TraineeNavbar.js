import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

function TraineeNavbar() {
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
					<Button onClick={() => logoutFunction()}>Logout</Button>
				</Container>
			</Navbar>
		</>
	);
}

export default TraineeNavbar;
