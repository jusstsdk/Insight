import Login from "./components/Login";
import Logout from "./components/Logout";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

function App() {
	const userType = useSelector((state) => state.loginReducer).userType;
	return (
		<div className="App">
			{userType === "" && <Login />}
			<Home />
			{userType !== "" && <Logout />}
		</div>
	);
}

export default App;
