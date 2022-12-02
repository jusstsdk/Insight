import { Navigate } from "react-router-dom";

const InstructorProtected = ({ children }) => {
	const userType = localStorage.getItem("userType");
	if (userType !== "instructor") {
		return <Navigate to="/home" replace />;
	}

	return children;
};
export default InstructorProtected;
