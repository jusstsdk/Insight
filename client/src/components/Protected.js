import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Protected = (props) => {
	const userType = useSelector((state) => state.userReducer.type);
	console.log("my props", props);
	console.log(userType);
	if (!props.authorizedUserType && userType === "guest") {
		return <Navigate to="/login" replace />;
	} else if (
		props.authorizedUserType &&
		userType !== props.authorizedUserType
	) {
		return <Navigate to="/login" replace />;
	}

	return props.children;
};
export default Protected;
