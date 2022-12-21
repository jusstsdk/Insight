import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function ChangePasswordPopOver() {
	const navigate = useNavigate();
	const type = useSelector((state) => state.userReducer.type);

	return (
		<Button
			className="me-auto"
			onClick={() => {
				if (type === "Instructor") {
					navigate("/instructor/changePassword");
				} else if (type === "Administrator") {
					navigate("/admin/changePassword");
				} else if (type === "Trainee") {
					navigate("/trainee/changePassword");
				} else if (type === "CorporateTrainee") {
					navigate("/corporateTrainee/changePassword");
				}
			}}
		>
			Change password
		</Button>
	);
}
