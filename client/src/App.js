import Login from "./components/Login";
import Home from "./pages/Home";
import CreateCourse from "./pages/CreateCourse";
import { Route, Routes } from "react-router-dom";
import Protected from "./components/Protected";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken, setType, setId } from "./redux/userSlice";
import InstructorProtected from "./components/InstructorProtected";
function App() {
	const dispatch = useDispatch();

	// check if user local storage contains creds
	useEffect(() => {
		const storedToken = localStorage.getItem("token");
		const storedUsertype = localStorage.getItem("userType");
		const storedId = localStorage.getItem("id");

		if (!(storedToken === null) && !(storedToken === "")) {
			dispatch(setToken(JSON.parse(storedToken)));
			dispatch(setType(storedUsertype));
			dispatch(setId(storedId));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Routes>
				<Route
					exact
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
					path="/createCourse"
					element={
						<InstructorProtected>
							<CreateCourse />
						</InstructorProtected>
					}
				/>
			</Routes>
		</>
	);
}

export default App;
