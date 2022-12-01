import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

function Logout() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const logoutFunction = async () => {
		localStorage.clear();
		dispatch(logout());
		navigate("/login");
	};
	return <button onClick={() => logoutFunction()}>Logout</button>;
}

export default Logout;
