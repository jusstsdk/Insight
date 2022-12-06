import { Outlet} from "react-router-dom";
import TraineeNavbar from "./TraineeNavbar";

function TraineeLayout() {
	return (
		<>
			<TraineeNavbar />
			<Outlet />
		</>
	);
}

export default TraineeLayout;
