import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Protected = ({ children }) => {
    	const userType = useSelector((state) => state.userReducer.type);

	if (!userType) {
		return <Navigate to="/login" replace />;
	}

	return children;
};
export default Protected;
