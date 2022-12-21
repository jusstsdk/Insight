import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function EditProfilePopover() {
	const navigate = useNavigate();
	return (
		<Button
			className="me-auto"
			onClick={() => {
				navigate("/instructor/editProfile");
			}}>
			Edit Profile
		</Button>
	);
}
