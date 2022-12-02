import axios from "axios";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Form, Row, Col, Button } from "react-bootstrap";
import "../css/createCourse.css";
import AddSubject from "../components/AddSubject";

function CreateCourse() {
	const Title = useRef();
	const Price = useRef();
	const Summary = useRef();

	const [Subjects, setSubjects] = useState([]);
	const instructorId = useSelector((state) => state.userReducer.id);
	const handleCreateCourse = async (e) => {
		e.preventDefault();
		const config = {
			method: "POST",
			url: `http://localhost:4000/api/instructors/${instructorId}/courses`,
			headers: {},
			data: {
				title: Title.current.value,
				subjects: Subjects,
				summary: Summary.current.value,
				originalPrice: parseFloat(Price.current.value),
				instructors: [],
			},
		};

		try {
			await axios(config);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Form className="d-flex flex-column" id="createCourseForm">
			<h1>Instructor Create Course</h1>
			<Form.Group
				as={Row}
				className="mb-3 d-flex align-items-center justify-content-start"
				controlId="formHorizontalEmail">
				<Form.Label column sm={1}>
					Title
				</Form.Label>
				<Col sm={3}>
					<Form.Control type="text" placeholder="Title" ref={Title} />
				</Col>

				<Form.Label column sm={1}>
					Price
				</Form.Label>
				<Col sm={2}>
					<Form.Control type="number" placeholder="Price" ref={Price} />
				</Col>
			</Form.Group>

			{/* Summary */}
			<Form.Group as={Row} className="mb-3 d-flex align-items-center justify-content-start">
				<Form.Label column sm={1}>
					Summary
				</Form.Label>
				<Col sm={10}>
					<Form.Control as="textarea" type="text" placeholder="Summary" rows={3} ref={Summary} />
				</Col>
			</Form.Group>
			<AddSubject Subjects={Subjects} setSubjects={setSubjects} />
			<Button onClick={(e) => handleCreateCourse(e)}>Create Course</Button>
		</Form>
	);
}

export default CreateCourse;
