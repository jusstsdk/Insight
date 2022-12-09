import { useNavigate } from "react-router-dom";

export default function CorporateTraineeNavbarButtons() {
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
