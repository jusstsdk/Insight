import Login from "./pages/Login";
import Home from "./pages/Home";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Protected from "./components/Protected";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken, setType, setUser } from "./redux/userSlice";
import CreateAdmin from "./components/CreateAdmin";
import CreateCorporateTrainee from "./components/CreateCorporateTrainee";
import CreateInstructor from "./components/CreateInstructor";
import SignUp from "./components/SignUp";

function App() {
	const dispatch = useDispatch();

	// check if user local storage contains credentials
	useEffect(() => {
		const storedToken = localStorage.getItem("token");
		const storedUserType = localStorage.getItem("userType");
		const storedUser = localStorage.getItem("user");

		if (!(storedToken === null) && !(storedToken === "")) {
			dispatch(setToken(JSON.parse(storedToken)));
			dispatch(setType(JSON.parse(storedUserType)));
			dispatch(setUser(JSON.parse(storedUser)));
		}
	}, []);

	return (
		<div className="App">
			<Routes>
				<Route
					path="/"
					element={
						<Protected>
							<Navigate to="/home" replace />
						</Protected>
					}
				/>
				<Route path="/login" element={<Login />} />
				<Route
					path="/home"
					element={
						<Protected>
							<Home />
						</Protected>
					}
				/>
				<Route
					path="/createAdmin"
					element={
						<Protected authorizedUserType="admin">
							<CreateAdmin />
						</Protected>
					}
				/>
				<Route
					path="/createCorporateTrainee"
					element={
						<Protected authorizedUserType="admin">
							<CreateCorporateTrainee />
						</Protected>
					}
				/>
				<Route
					path="/createInstructor"
					element={
						<Protected authorizedUserType="admin">
							<CreateInstructor />
						</Protected>
					}
				/>
				<Route path="/SignUp" element={<SignUp />} />
			</Routes>
		</div>
	);
}

export default App;
