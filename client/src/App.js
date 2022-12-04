import Login from "./components/Login";
import Home from "./pages/Home";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Protected from "./components/Protected";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken, setType } from "./redux/userSlice";
import AdminProtected from "./components/AdminProtected";
import CreateAdmin from "./components/CreateAdmin";
import CreateCorporateTrainee from "./components/CreateCorporateTrainee";
import CreateInstructor from "./components/CreateInstructor";

function App() {
	const dispatch = useDispatch();

	// check if user local storage contains creds
	useEffect(() => {
		const storedToken = localStorage.getItem("token");
		const storedUsertype = localStorage.getItem("userType");
		if (!(storedToken === null) && !(storedToken === "")) {
			dispatch(setToken(storedToken));
			dispatch(setType(storedUsertype));
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
						<AdminProtected>
							<CreateAdmin />
						</AdminProtected>
					}
				/>
				<Route
					path="/createCorporateTrainee"
					element={
						<AdminProtected>
							<CreateCorporateTrainee />
						</AdminProtected>
					}
				/>
				<Route
					path="/createInstructor"
					element={
						<AdminProtected>
							<CreateInstructor />
						</AdminProtected>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
