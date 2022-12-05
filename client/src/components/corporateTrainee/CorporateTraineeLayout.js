import { Outlet} from "react-router-dom";
import CorporateTraineeNavbar from "./CorporateTraineeNavbar";

function CorporateTraineeLayout() {
	return (
		<>
			<CorporateTraineeNavbar />
			<Outlet />
		</>
	);
}

export default CorporateTraineeLayout;
