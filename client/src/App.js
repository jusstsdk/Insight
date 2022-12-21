import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "./redux/userSlice";
import { AdminRoutes } from "./routes/AdminRoutes";
import { InstructorRoutes } from "./routes/InstructorRoutes";
import { TraineeRoutes } from "./routes/TraineeRoutes";
import { CorporateTraineeRoutes } from "./routes/CorporateTraineeRoutes";
import { GuestRoutes } from "./routes/GuestRoutes";
import { RedirectToHome } from "./components/shared/RedirectToHome";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<RedirectToHome />} />
				<Route path="/guest/*" element={<GuestRoutes />} />
				<Route path="/admin/*" element={<AdminRoutes />} />
				<Route path="/instructor/*" element={<InstructorRoutes />} />
				<Route path="/trainee/*" element={<TraineeRoutes />} />
				<Route
					path="/corporateTrainee/*"
					element={<CorporateTraineeRoutes />}
				/>
			</Routes>
		</>
	);
}

export default App;
