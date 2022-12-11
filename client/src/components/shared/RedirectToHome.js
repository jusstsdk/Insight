import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export function RedirectToHome() {
	const userType = useSelector((state) => state.userReducer.type);

	switch (userType) {
		case "Administrator":
			return <Navigate to="/admin" replace />;
		case "Instructor":
			return <Navigate to="/instructor" replace />;
		case "Trainee":
			return <Navigate to="/trainee" replace />;
		case "CorporateTrainee":
			return <Navigate to="/corporateTrainee" replace />;
		default:
			return <Navigate to="/guest" replace />;
	}
}
