import { useSelector } from "react-redux";
import AdminView from "../components/AdminView";
import InstructorView from "../components/InstructorView";
import TraineeView from "../components/TraineeView";
import CorporateTraineeView from "../components/CorporateTraineeView";
import { BrowserRouter } from "react-router-dom";
function Home() {
	const userType = useSelector((state) => state.loginReducer).userType;
	const displayView = () => {
		// Renders the appropriate View according to the logged in User.
		switch (userType) {
			case "admin":
				return <AdminView />;
			case "trainee":
				return <InstructorView />;
			// case "trainee":
			// 	return <TraineeView />;
			case "corporateTrainee":
				return <CorporateTraineeView />;
		}
	};
	return <BrowserRouter>{displayView()}</BrowserRouter>;
}

export default Home;
