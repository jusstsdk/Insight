import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function TraineeNavbarButtons() {
	const navigate = useNavigate();
    
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
