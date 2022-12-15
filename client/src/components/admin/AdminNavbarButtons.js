import { Nav, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function AdminNavbarButtons() {
	const navigate = useNavigate();

	return (
		<>
			<NavDropdown title="Create User" id="basic-nav-dropdown">
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
			<Nav.Link
				onClick={() => {
					navigate("courseRequests");
				}}
			>
				Course Requests
			</Nav.Link>
			<Nav.Link href="#link">Refunds</Nav.Link>
			<Nav.Link
				onClick={() => {
					navigate("promotion");
				}}
			>
				Discounts
			</Nav.Link>
		</>
	);
}
