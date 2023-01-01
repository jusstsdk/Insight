import { Route, Routes } from "react-router-dom";
import { AdminRoutes } from "./routes/AdminRoutes";
import { InstructorRoutes } from "./routes/InstructorRoutes";
import { TraineeRoutes } from "./routes/TraineeRoutes";
import { CorporateTraineeRoutes } from "./routes/CorporateTraineeRoutes";
import { GuestRoutes } from "./routes/GuestRoutes";
import { RedirectToHome } from "./components/shared/RedirectToHome";
import NotFound from "./pages/NotFound";
import CompleteSignUp from "./pages/CompleteSignUp";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<RedirectToHome />} />
				<Route path="/home/*" element={<RedirectToHome />} />
				<Route path="/completeSignUp" element={<CompleteSignUp />} />
				<Route path="/guest/*" element={<GuestRoutes />} />
				<Route path="/admin/*" element={<AdminRoutes />} />
				<Route path="/instructor/*" element={<InstructorRoutes />} />
				<Route path="/trainee/*" element={<TraineeRoutes />} />
				<Route
					path="/corporateTrainee/*"
					element={<CorporateTraineeRoutes />}
				/>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
}

export default App;
