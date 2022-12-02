import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
	const userType = localStorage.getItem("userType");

	if (!userType) {
		return <Navigate to="/login" replace />;
	}

	return children;
};
export default Protected;
