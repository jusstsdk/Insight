import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetMonthlyPay } from "../../redux/userSlice";
import api from "../../functions/api";
function InstructorHome() {
	const dispatch = useDispatch();
	const instructor = useSelector((state) => state.userReducer.user);
	const [monthlyPay, setMonthlyPay] = useState("");
	async function getMonthlyIncome() {
		const { data } = await api.get(`instructors/${instructor._id}/income`);
		if (data === 0){
			dispatch(resetMonthlyPay());
		}
		setMonthlyPay(data);
	}

	useEffect(() => {
		getMonthlyIncome();
	}, []);

	return (
		<>
			<h1>Instructor Home</h1>
			<h2>Monthly Pay: {instructor.monthlyPay.amount}</h2>
		</>
	);
}

export default InstructorHome;
