import SearchCourses from "./SearchCourses";
import { useState } from "react";
import { Button } from "react-bootstrap";

function AdminView() {
	const [courses, setCourses] = useState([]);

	return (
		<>
			<h1>Admin</h1>
			<SearchCourses setCourses={setCourses}/>
			<Button onClick={(()=>{
				console.log(courses);
			})}>Log Courses</Button>
		</>
	);
}

export default AdminView;
