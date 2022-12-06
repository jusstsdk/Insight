import { Button } from "react-bootstrap";
import { Link, Route, Routes } from "react-router-dom";
import CourseList from "./CourseList";
import viewCourses from "../components/MyCourses";
import MyCourses from "../components/MyCourses";
function CorporateTraineeView() {
	return (
		<>
			<Link to={"/CourseList"}>
				<Button>courses</Button>
			</Link>
			<h1>corporateTrainee</h1>
			<h2>My Courses</h2>
			<MyCourses/>
		</>
	);
}

export default CorporateTraineeView;
