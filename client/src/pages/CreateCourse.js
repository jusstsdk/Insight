import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import "../css/createCourse.css";
import AddSubject from "../components/AddSubject";
import DropDownMenu from "../components/DropDownMenu";
function CreateCourse() {
	const Title = useRef();
	const Price = useRef();
	const Summary = useRef();
	const PreviewVideo = useRef();
	const [Subjects, setSubjects] = useState([]);
	const [Instructors, setInstructors] = useState([]);
	const [AllInstructors, setAllInstructors] = useState([]);
	const instructorId = localStorage.getItem("id");
	const getData = async () => {
		const config = {
			method: "GET",
			url: `http://localhost:4000/api/instructors`,
			headers: {},
		};

		try {
			let response = await axios(config);
			let filteredInstructors = response.data.filter((instructor) => {
				return instructor._id !== instructorId;
			});
			setAllInstructors(filteredInstructors);
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleCreateCourse = async (e) => {
		e.preventDefault();
		let instructorsIds = Instructors.map((instructor) => instructor._id);
		const config = {
			method: "POST",
			url: `http://localhost:4000/api/instructors/${instructorId}/courses`,
			headers: {},
			data: {
				title: Title.current.value,
				subjects: Subjects,
				summary: Summary.current.value,
				originalPrice: parseFloat(Price.current.value),
				instructors: instructorsIds,
				previewVideo: PreviewVideo.current.value,
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
			<Col className="d-flex justify-content-center">
				<h1>Instructor Create Course</h1>
			</Col>
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
			<Form.Group as={Row} className="mb-3 d-flex align-items-center justify-content-start">
				<Form.Label column sm={2}>
					Preview Video
				</Form.Label>
				<Col sm={5}>
					<Form.Control type="text" placeholder="Preview Video" ref={PreviewVideo} />
				</Col>
			</Form.Group>
			<AddSubject Subjects={Subjects} setSubjects={setSubjects} />
			<Form.Group as={Row} className="mb-3 d-flex align-items-center justify-content-start">
				<Form.Label column sm={2}>
					Instructors
				</Form.Label>
				<Col sm={8}>
					{console.log(Instructors)}
					<DropDownMenu
						state={AllInstructors}
						setState={setInstructors}
						selectedState={Instructors}
						displayValue="email"
						placeholder="Select Course Instructors"
						emptyRecordMsg="You can't add more Instructors."
					/>
				</Col>
			</Form.Group>
			<Col className="d-flex justify-content-center">
				<Button onClick={(e) => handleCreateCourse(e)}>Create Course</Button>
			</Col>
		</Form>
	);
}

export default CreateCourse;
