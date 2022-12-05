import { Button } from "react-bootstrap";
import { Link, Route, Routes } from "react-router-dom";
import CourseList from "../components/CourseList";
import viewCourses from "./ViewCourses";
function CorporateTraineeView() {
	return (
		<>
			<Link to={"/CourseList"}>
				<Button>courses</Button>
			</Link>
			<h1>corporateTrainee</h1>
			<h2>My Courses</h2>
			
		</>
	);
}

export default CorporateTraineeView;
