import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken, setType } from "../redux/userSlice";

const Protected = ({ children }) => {
	const userType = useSelector((state) => state.userReducer.type);

    const dispatch = useDispatch();

	useEffect(() => {
		const storedToken = localStorage.getItem("token");
		const storedUsertype = localStorage.getItem("userType");
		if (!(storedToken === null) && !(storedToken === "")) {
			dispatch(setToken(JSON.parse(storedToken)));
			dispatch(setType(JSON.parse(storedUsertype)));
		}
	}, []);

    console.log(userType);

	if (!userType) {
		return <Navigate to="/login" replace />;
	}

	return children;
};
export default Protected;
