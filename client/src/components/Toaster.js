import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, Toast } from "react-bootstrap";

import { removeNotification } from "../redux/notificationsSlice";
export default function Toaster(props) {
	const dispatch = useDispatch();
	const Notfications = useSelector((state) => state.notificationsReducer.notifications);
	return (
		<ToastContainer className="w-50 d-flex flex-column align-items-end my-3" position="bottom-end">
			{Notfications.map((notification, i) => (
				<Toast
					className="d-inline-block my-1 me-3 l"
					key={i}
					onClose={() => {
						dispatch(removeNotification(i));
					}}>
					<Toast.Header>
						<strong className="me-auto">{notification.title} </strong>
					</Toast.Header>
					<Toast.Body className={notification.color}>{notification.info}</Toast.Body>
				</Toast>
			))}
		</ToastContainer>
	);
}
