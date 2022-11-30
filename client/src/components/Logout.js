import { useDispatch } from "react-redux";
import { logout } from "../redux/login";
function Login() {
	const dispatch = useDispatch();
	const logoutFunction = async () => {
		localStorage.clear();
		dispatch(logout());
	};
	return <button onClick={() => logoutFunction()}>Logout</button>;
}

export default Login;
