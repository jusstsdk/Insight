import { Navigate } from "react-router-dom";

const Protected = ({children, authorizedUserType}) => {
	const userType = useSelector((state) => state.userReducer.type);
	
	if (!authorizedUserType && userType === "guest") {
		return <Navigate to="/login" replace />;
	} else if (
		authorizedUserType &&
		userType !== authorizedUserType
	) {
		return <Navigate to="/login" replace />;
	}

	return children;
};
export default Protected;
