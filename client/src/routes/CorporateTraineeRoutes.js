import { Routes, Route } from "react-router-dom";
import CorporateTraineeLayout from "../components/corporateTrainee/CorporateTraineeLayout";
import Protected from "../components/Protected";
import CorporateTraineeView from "../pages/corporateTrainee/CorporateTraineeView";
import CourseDetails from "../pages/corporateTrainee/CourseTraineePOV";
import CourseList from "../pages/corporateTrainee/CourseList";

export function CorporateTraineeRoutes() {
	return (
		<>
			<CorporateTraineeLayout />
			<Routes>
				<Route path="" element={<CorporateTraineeView />} />
				<Route path="courses" element={<CourseList />} />
				<Route path="courses/:id" element={<CourseDetails />} />
			</Routes>
		</>
	);
}
