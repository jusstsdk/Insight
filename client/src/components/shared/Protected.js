import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Protected = ({ children, authorizedUserType }) => {
	const userType = useSelector((state) => state.userReducer.type);
	
	if (authorizedUserType !== null && userType === "Guest") {
		return <Navigate to="/guest" replace />;
	} else if (authorizedUserType && userType !== authorizedUserType) {
		return <Navigate to="/guest" replace />;
	}

	return children;
};
export default Protected;
