import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import API from "../../../functions/api";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";


function Payment() {
	const [stripePromise, setStripePromise] = useState(null);
	const [clientSecret, setClientSecret] = useState("");
	const params = useParams();
	let courseId = params.id;

	const wallet = useSelector((state) => state.userReducer.user.wallet);

	async function setup() {
		let response = await API.get(`courses/${courseId}`);
		const course = response.data;
		let amount = course.price - wallet;
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
				amount: amount,
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
			<h1>React Stripe and the Payment Element</h1>

			{clientSecret && stripePromise && (
				<Elements stripe={stripePromise} options={{ clientSecret }}>
					<CheckoutForm />
				</Elements>
			)}
		</>
	);
}

export default Payment;
