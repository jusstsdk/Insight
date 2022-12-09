import { useDispatch, useSelector } from "react-redux";
import { logout, setCountry } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import SelectCountry from "../SelectCountry";

export default function ProfilePopover() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.userReducer.user);
	return (
		<>
			<SelectCountry Country={user.country} setCountry={(payload)=>{
				dispatch(setCountry(payload))
			}} />
			<Button
				onClick={() => {
					dispatch(logout());
					navigate("/guest");
				}}
			>
				Logout
			</Button>
		</>
	);
}
