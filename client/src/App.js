import Login from "./components/Login";
import Home from "./pages/Home";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken, setType } from "./redux/userSlice";

function App() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		let storedToken = localStorage.getItem("token");
		let storedUsertype = localStorage.getItem("userType");
		if (!(storedToken === null) && !(storedToken === "")) {
			dispatch(setToken(JSON.parse(storedToken)));
			dispatch(setType(JSON.parse(storedUsertype)));
			navigate("/home");
		} else navigate("/login");
	}, []);

	return (
		<div className="App">
			<Routes>
				<Route path="/home" element={<Home />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</div>
	);
}

export default App;
