import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function AdminView() {
	const navigate = useNavigate();
	return (
		<div>
			<h1>Admin</h1>
			<Button
				onClick={() => {
					navigate("/createAdmin");
				}}
			>
				Create Admin
			</Button>
			<Button
				onClick={() => {
					navigate("/createCorporateTrainee");
				}}
			>
				Create Corporate Trainee
			</Button>
			<Button
				onClick={() => {
					navigate("/createInstructor");
				}}
			>
				Create Instructor
			</Button>
		</div>
	);
}

export default AdminView;
