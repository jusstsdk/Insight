import { useDispatch } from "react-redux";
import { setToken, setUserType, logout } from "../redux/login";
import axios from "axios";
import { useEffect, createRef, useState } from "react";
function Login() {
	const dispatch = useDispatch();
	const logoutFunction = async () => {
		localStorage.clear();
		dispatch(logout());
	};
	return <button onClick={() => logoutFunction()}>Logout</button>;
}

export default Login;
