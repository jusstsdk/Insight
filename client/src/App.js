import Login from "./components/Login";
import Home from "./pages/Home";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Protected from "./components/Protected";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken, setType, setUser } from "./redux/userSlice";
import CourseDetails from "./pages/CourseDetails";
import CourseList from "./pages/CourseList";

function App() {
	const dispatch = useDispatch();

	// check if user local storage contains creds
	useEffect(() => {
		const storedToken = localStorage.getItem("token");
		const storedUsertype = localStorage.getItem("userType");
		const storedUser = localStorage.getItem("user");

		if (!(storedToken === null) && !(storedToken === "")) {
			dispatch(setToken(JSON.parse(storedToken)));
			dispatch(setType(JSON.parse(storedUsertype)));
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
					path="/CourseList"
					element={
						<Protected authorizedUserType="corporateTrainee">
							<CourseList />
						</Protected>
					}
				/>
				<Route
					path="/CourseDetails/:id"
					element={
						<Protected authorizedUserType="corporateTrainee">
							<CourseDetails />
						</Protected>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
