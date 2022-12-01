import Login from "./components/Login";
import Home from "./pages/Home";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Protected from "./components/Protected";
import { Navigate } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route
					path="/"
					element={
						<Protected>
							<Navigate to="/home" replace/>
						</Protected>
					}
				/>
				<Route path="/login" element={<Login />} />
				<Route
					path="/home"
					element={
						<Protected>
							<Home />
						</Protected>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
