import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useNavigate, useParams } from "react-router-dom";

import API from "../../../functions/api";
import {
  addCourse,
  payFromWallet,
  setCourses,
  setUser,
} from "../../../redux/userSlice";
import { addNotification } from "../../../redux/notificationsSlice";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);
  let courseId = params.id;
  const userID = useSelector((state) => state.userReducer.user._id);
  let user = useSelector((state) => state.userReducer.user);
  const wallet = useSelector((state) => state.userReducer.user.wallet);
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await API.get(`courses/${courseId}`);
    const course = response.data;
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    // setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      // confirmParams: {
      //   // Make sure to change this to your payment completion page
      //   // redirect: "if_required",
      //
      //   return_url: "http://localhost:3000/",
      // },
      redirect: "if_required",
    });

    console.log(error);

    // const response2 = await API.post(
    // 	`/trainees/${userID}/courses/${courseId}/payment`
    // );
    //
    // dispatch(setCourses(response2.data.courses));

    // if (course.price > wallet) {
    // 	dispatch(payFromWallet(wallet));
    // } else {
    // 	dispatch(payFromWallet(course.price));
    // }
    //
    //
    // MySwal.fire({
    // 	toast: true,
    // 	position: 'bottom-end',
    // 	showConfirmButton: false,
    // 	timer: 4000,
    // 	title: <strong>purchase successful</strong>,
    // 	html: <i>course successfully purchased,you can now access all the content!</i>,
    // 	icon: "success",
    // 	timerProgressBar: true,
    // 	grow:'row'
    // });
    // navigate("/");

    // if (error.type === "card_error" || error.type === "validation_error") {
    //   setMessage(error.message);
    // } else {
    //   setMessage(error.message);
    // }

    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button
        type="primary"
        disabled={isProcessing || !stripe || !elements}
        id="submit"
      >
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
