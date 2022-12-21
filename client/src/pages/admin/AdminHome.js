import  {useSelector} from "react-redux";
function AdminView() {
	
	const user = useSelector((state) => state.userReducer.user);
	return (
		<>
			<h1>{user.username}</h1>
		</>
	);
}

export default AdminView;
