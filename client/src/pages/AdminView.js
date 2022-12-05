import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/admin/AdminNavbar";

function AdminView() {
	const navigate = useNavigate();

	return (
		<>
			<AdminNavbar />
			<h1>Admin</h1>
		</>
	);
}

export default AdminView;
