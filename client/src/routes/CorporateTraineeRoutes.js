import { Routes, Route } from "react-router-dom";
import CorporateTraineeLayout from "../components/corporateTrainee/CorporateTraineeLayout";
import Protected from "../components/Protected";

export function CorporateTraineeRoutes() {
	return (
		<>
			<Protected authorizedUserType={"corporateTrainee"}>
				<CorporateTraineeLayout />
				<Routes></Routes>
			</Protected>
		</>
	);
}
