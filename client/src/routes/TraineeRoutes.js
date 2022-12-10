import { Routes, Route } from "react-router-dom";
import CourseTraineePOV from "../pages/corporateTrainee/CourseTraineePOV";
import TraineeLayout from "../components/trainee/TraineeLayout";
import TraineeView from "../pages/trainee/TraineeView";
import CourseList from "../pages/corporateTrainee/CourseList";
import Payment from "../pages/corporateTrainee/Payment";
export function TraineeRoutes() {
	return (
		<>
			
				<TraineeLayout />
				<Routes>
					<Route path="" element={<TraineeView />} />
					<Route path="courses" element={<CourseList />} />
					<Route path="courses/:id" element={<CourseTraineePOV />} />
					<Route path="courses/:id/payment/*" element={<Payment />} />
				</Routes>
			
		</>
	);
}
