import { AiFillCheckCircle } from "react-icons/ai";
export default function Toast(props) {
	return (
		<Toast>
			<Toast.Header>
				{/* <AiFillCheckCircle className=" me-2" /> */}
				<strong className="me-auto">{props.title}</strong>
			</Toast.Header>
			<Toast.Body>{props.info}</Toast.Body>
		</Toast>
	);
}
