import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import API from "../../../functions/api";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";


function Payment() {
	const [stripePromise, setStripePromise] = useState(null);
	const [clientSecret, setClientSecret] = useState("");
	const navigate = useNavigate();

	const params = useParams();
	const navigate = useNavigate();
	let courseId = params.id;

	const wallet = useSelector((state) => state.userReducer.user.wallet);

	async function setup() {
		let response;
		try {
			response = await API.get(`courses/${courseId}`);
		} catch (error) {
			navigate("/notFound");
			console.log(error);
			return;
		}
		const course = response.data;
		let amount;
		if (
			course.promotion.endDate > new Date().toISOString() &&
			course.promotion.discount > 0
		) {
			amount = course.price - wallet;
		} else {
			amount = course.originalPrice - wallet;
		}
		if (amount < 0) {
			amount = 0;
		}
		let config = {
			method: "GET",
			url: "http://localhost:4000/config",
		};
		response = await axios(config);
		const { publishableKey } = response.data;
		setStripePromise(loadStripe(publishableKey));
		config = {
			method: "POST",
			url: "http://localhost:4000/create-payment-intent",
			data: {
				currency: "usd",
				amount: amount * 100,
				automatic_payment_methods: { enabled: true },
			},
		};
		response = await axios(config);
		let { clientSecret } = response.data;
		setClientSecret(clientSecret);
	}

	useEffect(() => {
		setup();
	}, []);

	return (
		<>
			<h1>Checkout</h1>

			{clientSecret && stripePromise && (
				<Elements stripe={stripePromise} options={{ clientSecret }}>
					<CheckoutForm />
				</Elements>
			)}
		</>
	);
}

export default Payment;
