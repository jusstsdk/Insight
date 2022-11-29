import { useDispatch, useSelector } from "react-redux";
import { setToken } from "./redux/login";
import axios from "axios";
function App() {
	const { token } = useSelector((state) => state.counter);
	const dispatch = useDispatch();
	const getTokenFunction = async () => {
		const config = {
			method: "get",
			url: "http://localhost:4000/api/administrators/tokenTest",
			headers: {},
		};

		let token = await axios(config);
		console.log(token);
		dispatch(setToken(token.data.token));
	};
	return (
		<div className="App">
			<h1>The token is {token}</h1>
			<button onClick={() => getTokenFunction()}> Login </button>
		</div>
	);
}

export default App;
