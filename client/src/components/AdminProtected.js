import { Navigate } from "react-router-dom";

const AdminProtected = ({ children }) => {
	const userType = localStorage.getItem("userType");

	if (userType !== "admin") {
		return <Navigate to="/home" replace />;
	}

	return children;
};
export default AdminProtected;
