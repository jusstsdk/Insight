import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken, setType, setUser } from "./redux/userSlice";
import SignUp from "./components/SignUp";
import { AdminRoutes } from "./routes/AdminRoutes";
import { InstructorRoutes } from "./routes/InstructorRoutes";
import { TraineeRoutes } from "./routes/TraineeRoutes";
import { CorporateTraineeRoutes } from "./routes/CorporateTraineeRoutes";
import { RedirectToHome } from "./components/RedirectToHome";

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

	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<RedirectToHome />} />
				<Route path="/login" element={<Login />} />

				<Route path="/admin/*" element={<AdminRoutes />} />
				<Route path="/instructor/*" element={<InstructorRoutes />} />
				<Route path="/trainee/*" element={<TraineeRoutes />} />
				<Route
					path="/corporateTrainee/*"
					element={<CorporateTraineeRoutes />}
				/>

				<Route path="/signUp" element={<SignUp />} />
			</Routes>
		</div>
	);
}

export default App;
