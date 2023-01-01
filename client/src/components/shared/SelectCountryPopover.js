import { useDispatch, useSelector } from "react-redux";
import updateCurrency from "../../functions/updateCurrency";
import { setCountry, setUser } from "../../redux/userSlice";
import CountryDropdown from "./CountryDropdown";

export default function SelectCountryPopover() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.userReducer.user);
	const userType = useSelector((state) => state.userReducer.type);

	async function changeCountry(payload) {
		let updatedUser = { ...user, country: payload };
		updatedUser = await updateCurrency(updatedUser);
		dispatch(setUser(updatedUser));
		dispatch(setCountry(payload));
	}
	return (
		<>
			{userType !== "Administrator" && (
				<CountryDropdown
					Country={user.country}
					setCountry={(payload) => {
						changeCountry(payload);
					}}
				/>
			)}
		</>
	);
}
