import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import API from "../../api";
function Completion({ userId, courseId }) {
	const navigate = useNavigate();
	useEffect(() => {
    API.post(`/trainees/${userId}/courses/${courseId}/payment`);
  }, [])
  
  return (
		<>
			<h1>Thank you! 🎉</h1>
			<Button variant="secondary" onClick={navigate("/courses")}>
				find more courses
			</Button>

			<Button variant="primary" onClick={navigate("/")}>
				Home
			</Button>
		</>
	);
}

export default Completion;
