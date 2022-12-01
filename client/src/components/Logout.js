import { useDispatch } from "react-redux";
import { logout } from "../redux/login";
import { useNavigate } from "react-router-dom";

function Login() {
	const dispatch = useDispatch();
	const logoutFunction = async () => {
		localStorage.clear();
		dispatch(logout());
		// navigate("/");
		window.location.href = "/";
	};
	return <button onClick={() => logoutFunction()}>Logout</button>;
}

export default Login;
