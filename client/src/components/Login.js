import { useDispatch, useSelector } from "react-redux";
import { setToken, setUserType } from "../redux/login";
import axios from "axios";
import { useEffect } from "react";
function Login() {
	const { token, userType } = useSelector((state) => state.loginReducer);
	const dispatch = useDispatch();
	const loginFunction = async () => {
		let storedToken = localStorage.getItem("token");
		let storedUsertype = localStorage.getItem("userType");
		if (storedToken == null || storedToken == "") {
			const config = {
				method: "post",
				url: "http://localhost:4000/api/users/login",
				headers: {},
				data: {
					username: "Harry Potter",
					password: "H123",
				},
			};

			let response = await axios(config);
			localStorage.setItem("token", JSON.stringify(response.data["x-auth-token"]));
			localStorage.setItem("userType", JSON.stringify(response.data["userType"]));
			storedToken = response.data["x-auth-token"];
			storedUsertype = response.data["userType"];
		}
		console.log(storedToken);
		console.log(storedUsertype);
		dispatch(setToken({ token: storedToken }));
		dispatch(setUserType({ userType: storedUsertype }));
	};
	useEffect(() => {
		let storedToken = localStorage.getItem("token");
		let storedUsertype = localStorage.getItem("userType");
		if (!(storedToken == null) && !(storedToken == "")) {
			dispatch(setToken({ token: JSON.parse(storedToken) }));
			dispatch(setUserType({ userType: JSON.parse(storedUsertype) }));
		}
	}, []);
	return (
		<div>
			<h1>Login Component</h1>
			<h3>The userType is {userType}</h3>
			<h3>The token is {token}</h3>
			<button onClick={() => loginFunction()}> Login </button>
		</div>
	);
}

export default Login;
