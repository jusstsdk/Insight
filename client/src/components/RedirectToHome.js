import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export function RedirectToHome() {
	const userType = useSelector((state) => state.userReducer.type);

    switch (userType) {
        case "admin":
            return <Navigate to="/admin" replace />;
        case "instructor":
            return <Navigate to="/instructor" replace />;
        case "trainee":
            return <Navigate to="/trainee" replace />;
        case "corporateTrainee":
            return <Navigate to="/corporateTrainee" replace />;
    }
}