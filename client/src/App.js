import Login from "./pages/Login";
import Home from "./pages/Home";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Protected from "./components/Protected";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken, setType, setUser } from "./redux/userSlice";
import CreateAdmin from "./components/admin/CreateAdmin";
import CreateCorporateTrainee from "./components/admin/CreateCorporateTrainee";
import CreateInstructor from "./components/admin/CreateInstructor";
import SignUp from "./components/SignUp";
import AdminLayout from "./components/admin/AdminLayout";
import InstructorLayout from "./components/instructor/InstructorLayout";
import TraineeLayout from "./components/trainee/TraineeLayout";
import CorporateTraineeLayout from "./components/corporateTrainee/CorporateTraineeLayout";

function App() {
	const dispatch = useDispatch();

	// check if user local storage contains credentials

	const storedToken = localStorage.getItem("token");
	const storedUserType = localStorage.getItem("userType");
	const storedUser = localStorage.getItem("user");

	useEffect(() => {
		if (!(storedToken === null) && !(storedToken === "")) {
			dispatch(setToken(storedToken));
			dispatch(setType(storedUserType));
			dispatch(setUser(JSON.parse(storedUser)));
		}
	}, []);

	function redirectToHome() {
		switch (storedUserType) {
			case "admin":
				return <Navigate to="/admin" replace />;
			case "instructor":
				return <Navigate to="/instructor" replace />;
			case "trainee":
				return <Navigate to="/trainee" replace />;
			case "corporateTrainee":
				return <Navigate to="/corporateTrainee" replace />;
		}
	}

	return (
		<div className="App">
			<Routes>
				<Route path="/" element={redirectToHome()} />
				<Route path="/login" element={<Login />} />

				<Route
					path="/admin"
					element={
						<Protected authorizedUserType={"admin"}>
							<AdminLayout />
						</Protected>
					}
				>
					<Route path="createAdmin" element={<CreateAdmin />} />
					<Route
						path="createCorporateTrainee"
						element={<CreateCorporateTrainee />}
					/>
					<Route
						path="createInstructor"
						element={<CreateInstructor />}
					/>
				</Route>

				<Route
					path="/instructor"
					element={
						<Protected authorizedUserType={"instructor"}>
							<InstructorLayout />
						</Protected>
					}
				></Route>

				<Route
					path="/trainee"
					element={
						<Protected authorizedUserType={"trainee"}>
							<TraineeLayout />
						</Protected>
					}
				></Route>

				<Route
					path="/corporateTrainee"
					element={
						<Protected authorizedUserType={"corporateTrainee"}>
							<CorporateTraineeLayout />
						</Protected>
					}
				></Route>
				<Route path="/signUp" element={<SignUp />} />
			</Routes>
		</div>
	);
}

export default App;
