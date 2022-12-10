import { Routes, Route } from "react-router-dom";
import CourseTraineePOV from "../pages/corporateTrainee/CourseTraineePOV";
import TraineeLayout from "../components/trainee/TraineeLayout";
import PersonalInfo from "../components/PersonalInfo";
import TraineeView from "../pages/trainee/TraineeView";
import Protected from "../components/Protected";
import Payment from "../pages/corporateTrainee/OldPayment";
import CourseList from "../pages/corporateTrainee/CourseList";
import PaymentRoutes from "./PaymentRoutes";
export function TraineeRoutes() {
	return (
		<>
			<Protected authorizedUserType={"trainee"}>
				<TraineeLayout />
				<Routes>
					<Route path="" element={<TraineeView />} />
					<Route path="courses" element={<CourseList />} />
					<Route path="courses/:id" element={<CourseTraineePOV />} />
					<Route path="courses/:id/payment/*" element={<PaymentRoutes />} />
				</Routes>
			</Protected>
		</>
	);
}
