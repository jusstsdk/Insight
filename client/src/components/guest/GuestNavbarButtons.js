import { Nav, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function GuestNavbarButtons() {
	return (
		<>
			<Nav.Link
				onClick={() => {
					navigate("courses");
				}}
			>
				Search
			</Nav.Link>
		</>
	);
}
