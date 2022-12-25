import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCountry, setUser } from "../../redux/userSlice";
import CountryDropdown from "./CountryDropdown";

export default function SelectCountryPopover() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.userReducer.user);
	const userType = useSelector((state) => state.userReducer.type);

	async function changeCountry(payload) {
		const responseCountryApi = await axios.get(`https://restcountries.com/v3.1/name/${payload}`);
		const localCurrency = Object.keys(responseCountryApi.data[0].currencies)[0];

		const responseExchangeRate = await axios.get(
			"https://api.apilayer.com/exchangerates_data/latest",
			{
				headers: {
					apikey: "J1zJcZ2LQUz9pAhV05AnKEl62pd0iBfn",
				},
				params: {
					base: "USD",
				},
			}
		);
		const exchangeRate = responseExchangeRate.data.rates[localCurrency];

		let updatedUser = { ...user };
		// if(userType === "Trainee"){
		// 	updatedUser.wallet = Math.trunc(updatedUser.wallet * exchangeRate);
		// }else if(userType === "Instructor"){
		// 	updatedUser.monthlyPay = Math.trunc(updatedUser.monthlyPay * exchangeRate);
		// }
		// console.log(updatedUser);
		updatedUser.currency = localCurrency;
		updatedUser.exchangeRate = exchangeRate;

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
