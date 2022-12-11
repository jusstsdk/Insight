import { Navigate } from "react-router-dom";
const Protected = ({ children, authorizedUserType }) => {
	const userType = localStorage.getItem("userType");

	if (authorizedUserType !== null && userType === "Guest") {
		return <Navigate to="/guest" replace />;
	} else if (authorizedUserType && userType !== authorizedUserType) {
		return <Navigate to="/guest" replace />;
	}

	return children;
};
export default Protected;
