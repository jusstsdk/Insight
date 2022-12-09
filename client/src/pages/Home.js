import { useSelector } from "react-redux";
import AdminView from "./admin/AdminView";
import InstructorView from "../components/InstructorView";
import TraineeView from "./trainee/TraineeView";
import CorporateTraineeView from "./corporateTrainee/CorporateTraineeView";
import { BrowserRouter } from "react-router-dom";

function Home() {
	const userType = useSelector((state) => state.userReducer.type);
	const displayView = () => {
		// Renders the appropriate View according to the logged in User.
		switch (userType) {
			case "administrator":
				return <AdminView />;
			case "instructor":
				return <InstructorView />;
			case "trainee":
				return <TraineeView />;
			case "corporateTrainee":
				return <CorporateTraineeView />;
			default:
			// do nothing
		}
	};
	return (
		<>
			{displayView()}
		</>
	);
}

export default Home;
