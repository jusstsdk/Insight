import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import Profile from "./Profile";
import AdminNavbarButtons from "../admin/AdminNavbarButtons";
import GuestNavbarButtons from "../guest/GuestNavbarButtons";
import InstructorNavbarButtons from "../instructor/InstructorNavbarButtons";
import TraineeNavbarButtons from "../trainee/TraineeNavbarButtons";
import CorporateTraineeNavbarButtons from "../corporateTrainee/CorporateTraineeNavbarButtons";
import { useNavigate } from "react-router-dom";


export default function CustomNavbar() {
	const userType = useSelector((state) => state.userReducer.type);
	const navigate = useNavigate();

	const displayView = () => {
		// Renders the appropriate View according to the logged in User.
		switch (userType) {
			case "Administrator":
				return <AdminNavbarButtons />;
			case "Instructor":
				return <InstructorNavbarButtons />;
			case "Trainee":
				return <TraineeNavbarButtons />;
			case "CorporateTrainee":
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
