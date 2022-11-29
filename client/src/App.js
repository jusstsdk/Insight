import { useDispatch, useSelector } from "react-redux";
import { setToken } from "./redux/login";
import axios from "axios";
function App() {
	const { token } = useSelector((state) => state.counter);
	const dispatch = useDispatch();
	const loginFunction = async () => {
		const config = {
			method: "post",
			url: "http://localhost:4000/api/users/login",
			headers: {},
			data: {
				username: "admin62",
				password: "pass1",
			},
		};

		let response = await axios(config);
		// console.log(response.data["x-auth-token"]);
		localStorage.setItem("token", JSON.stringify(response.data["x-auth-token"]));
		// dispatch(setToken(response.data.token));
	};
	const getToken = async () => {
		const token = JSON.parse(localStorage.getItem("token"));

		dispatch(setToken(token));
		console.log(token);
	};
	return (
		<div className="App">
			<h1>The token is {token}</h1>
			<button onClick={() => loginFunction()}> Login </button>
			<button onClick={() => getToken()}> Get Token </button>
		</div>
	);
}

export default App;
