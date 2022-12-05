import { Form, Row, Col, Button, Tab, Tabs } from "react-bootstrap";
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import {useSelector} from "react-redux"

import DropDownMenu from "../DropDownMenu";
import AddSubject from "./AddSubject";
function AddInfo(props) {
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
					<Form.Control type="text" placeholder="Title" ref={props.Title} />
				</Col>

				<Form.Label column sm={1}>
					Price
				</Form.Label>
				<Col sm={2}>
					<Form.Control type="number" placeholder="Price" ref={props.Price} />
				</Col>
			</Form.Group>

			{/* Summary */}
			<Form.Group as={Row} className="mb-3 d-flex align-items-center justify-content-start">
				<Form.Label column sm={1}>
					Summary
				</Form.Label>
				<Col sm={10}>
					<Form.Control
						as="textarea"
						type="text"
						placeholder="Summary"
						rows={3}
						ref={props.Summary}
					/>
				</Col>
			</Form.Group>
			<Form.Group as={Row} className="mb-3 d-flex align-items-center justify-content-start">
				<Form.Label column sm={1}>
					Preview Video
				</Form.Label>
				<Col sm={5}>
					<Form.Control type="text" placeholder="Preview Video" ref={props.PreviewVideo} />
				</Col>
			</Form.Group>
			<AddSubject Subjects={props.Subjects} setSubjects={props.setSubjects} />
			<Form.Group as={Row} className="mb-3 d-flex align-items-center justify-content-start">
				<Form.Label column sm={1}>
					Instructors
				</Form.Label>
				<Col sm={8}>
					<DropDownMenu
						state={AllInstructors}
						setState={props.setInstructors}
						selectedState={props.Instructors}
						displayValue="email"
						placeholder="Select Course Instructors"
						emptyRecordMsg="You can't add more Instructors."
					/>
				</Col>
			</Form.Group>
		</>
	);
}
export default AddInfo;
