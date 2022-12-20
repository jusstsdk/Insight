import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import Profile from "./Profile";
import AdminNavbarButtons from "../admin/AdminNavbarButtons";
import GuestNavbarButtons from "../guest/GuestNavbarButtons";
import InstructorNavbarButtons from "../Instructor/InstructorNavbarButtons";
import TraineeNavbarButtons from "../trainee/TraineeNavbarButtons";
import CorporateTraineeNavbarButtons from "../corporateTrainee/CorporateTraineeNavbarButtons";
import { useNavigate } from "react-router-dom";

export default function CustomNavbar() {
	const userType = useSelector((state) => state.userReducer.type);
	const navigate = useNavigate();

	const displayView = () => {
		// Renders the appropriate View according to the logged in User.
		switch (userType) {
			case "administrator":
				return <AdminNavbarButtons />;
			case "instructor":
				return <InstructorNavbarButtons />;
			case "trainee":
				return <TraineeNavbarButtons />;
			case "corporateTrainee":
				return <CorporateTraineeNavbarButtons />;
			default:
				return <GuestNavbarButtons />;
		}
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
						<Nav className="me-auto">{displayView()}</Nav>
					</Navbar.Collapse>
					<Profile />
				</Container>
			</Navbar>
		</>
	);
}
