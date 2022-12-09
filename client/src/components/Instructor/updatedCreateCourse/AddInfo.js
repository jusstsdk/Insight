import axios from "axios";
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Row, Col, Button } from "react-bootstrap";

import { setInfo } from "../../../redux/createCourseSlice";

import AddSubject from "./AddSubject";
import DropDownMenu from "../../DropDownMenu";

export default function AddInfo(props) {
	const dispatch = useDispatch();

	const Title = useRef();
	const Price = useRef();
	const Summary = useRef();
	const PreviewVideo = useRef();
	const [Subjects, setSubjects] = useState([]);
	const [Instructors, setInstructors] = useState([]);
	const [AllInstructors, setAllInstructors] = useState([]);
	const instructorId = useSelector((state) => state.userReducer.user._id);

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

	const handleAddInfoAndNext = () => {
		let instructorsIds = Instructors.map((instructor) => instructor._id);

		const info = {
			title: Title.current.value,
			subjects: Subjects,
			summary: Summary.current.value,
			originalPrice: parseFloat(Price.current.value),
			instructors: instructorsIds,
			previewVideo: PreviewVideo.current.value,
		};
		dispatch(setInfo(info));
		props.setCurrentTab("addExam");
	};

	useEffect(() => {
		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<>
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
				<Form.Label column sm={1}>
					Preview Video
				</Form.Label>
				<Col sm={5}>
					<Form.Control type="text" placeholder="Preview Video" ref={PreviewVideo} />
				</Col>
			</Form.Group>
			<AddSubject Subjects={Subjects} setSubjects={setSubjects} />
			<Form.Group as={Row} className="mb-3 d-flex align-items-center justify-content-start">
				<Form.Label column sm={1}>
					Instructors
				</Form.Label>
				<Col sm={8}>
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
			<Col className="nextButton">
				<Button onClick={handleAddInfoAndNext}>Next</Button>
			</Col>
		</>
	);
}
