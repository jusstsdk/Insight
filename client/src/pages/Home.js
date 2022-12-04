import { useSelector } from "react-redux";
import AdminView from "./AdminView";
import InstructorView from "../components/InstructorView";
import TraineeView from "./TraineeView";
import CorporateTraineeView from "./CorporateTraineeView";
import { BrowserRouter } from "react-router-dom";
import Logout from "../components/Logout";
function Home() {
	const userType = useSelector((state) => state.userReducer.type);
	const displayView = () => {
		// Renders the appropriate View according to the logged in User.
		switch (userType) {
			case "admin":
				return <AdminView />;
			case "instructor":
				return <InstructorView />;
			case "trainee":
				return <TraineeView />;
			case "corporateTrainee":
				return <CorporateTraineeView />;
		}
	};
	return (
		<>
			{displayView()}
			<Logout />
		</>
	);
}

export default Home;
