import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Row, Col, Button } from "react-bootstrap";

import {
	setTitle,
	setSummary,
	setOriginalPrice,
	setPreviewVideo,
	setInstructors,
	setSubjects,
} from "../../../redux/courseInfoSlice";
import { SUBJECTS } from "../../../functions/subjects";
import DropDownMenu from "../../DropDownMenu";
import { AiOutlineArrowRight } from "react-icons/ai";

export default function AddInfo(props) {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.userReducer.user);
	const [AllInstructors, setAllInstructors] = useState([]);
	const instructorId = useSelector((state) => state.userReducer.user._id);
	const InfoTitle = useSelector((state) => state.courseInfoReducer.title);
	const InfoSummary = useSelector((state) => state.courseInfoReducer.summary);
	const InfoOriginalPrice = useSelector((state) => state.courseInfoReducer.originalPrice);
	const InfoPreviewVideo = useSelector((state) => state.courseInfoReducer.previewVideo);
	const InfoInstructors = useSelector((state) => state.courseInfoReducer.instructors).filter(
		(instructor) => {
			return instructor._id !== instructorId;
		}
	);
	const InfoSubjects = useSelector((state) => state.courseInfoReducer.subjects);
	const SummaryRef = useRef();
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
	const resizeTextArea = () => {
		SummaryRef.current.style.height = "auto";
		SummaryRef.current.style.height = SummaryRef.current.scrollHeight + "px";
	};
	useEffect(resizeTextArea, [InfoSummary]);

	useEffect(() => {
		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<h1 className="fs-3 fw-semibold text-muted">Adding Course Info</h1>
			{/* Title and Price */}
			<Form.Group
				as={Row}
				className="mb-3 d-flex align-items-center justify-content-start"
				controlId="formHorizontalEmail">
				<Form.Label column sm={1}>
					Title
				</Form.Label>
				<Col sm={3}>
					<Form.Control
						type="text"
						placeholder="Title"
						value={InfoTitle}
						onChange={(e) => {
							dispatch(setTitle(e.target.value));
						}}
					/>
				</Col>

				<Form.Label className="textFit" column sm={1}>
					Price in {user.currency}
				</Form.Label>
				<Col sm={2}>
					<Form.Control
						type="number"
						placeholder="Price"
						value={InfoOriginalPrice}
						onChange={(e) => {
							dispatch(setOriginalPrice(e.target.value));
						}}
					/>
					
				</Col>
			</Form.Group>

			{/* Subjects */}
			<Form.Group as={Row} className="mb-3 d-flex align-items-center justify-content-start">
				<Form.Label column sm={1}>
					Subjects
				</Form.Label>
				<Col sm={8}>
					<DropDownMenu
						id="multiselectSubjects"
						state={SUBJECTS}
						selectedState={InfoSubjects}
						onChange={(selectedList, selectedItem) => {
							dispatch(setSubjects(selectedList));
						}}
						isObject={false}
						placeholder="Select Course Subjects"
						emptyRecordMsg="You can't add more Subjects."
					/>
				</Col>
			</Form.Group>

			{/* Summary */}
			<Form.Group as={Row} className="mb-3 d-flex align-items-center justify-content-start">
				<Form.Label column sm={1}>
					Summary
				</Form.Label>
				<Col sm={10}>
					<Form.Control
						ref={SummaryRef}
						as="textarea"
						type="text"
						placeholder="Summary"
						rows={3}
						value={InfoSummary}
						onChange={(e) => {
							dispatch(setSummary(e.target.value));
						}}
					/>
				</Col>
			</Form.Group>

			{/* Instructors */}
			<Form.Group as={Row} className="mb-3 d-flex align-items-center justify-content-start">
				<Form.Label column sm={1}>
					Instructors
				</Form.Label>
				<Col sm={8}>
					<DropDownMenu
						id="multiselectInstructors"
						state={AllInstructors}
						selectedState={InfoInstructors}
						onChange={(selectedList, selectedItem) => {
							dispatch(setInstructors(selectedList));
						}}
						isObject={true}
						displayValue="email"
						placeholder="Select Course Instructors"
						emptyRecordMsg="You can't add more Instructors."
					/>
				</Col>
			</Form.Group>

			{/* Preview Video */}
			<Form.Group as={Row} className="mb-3 d-flex align-items-center justify-content-start">
				<Form.Label column sm={1}>
					Preview Video
				</Form.Label>
				<Col sm={5}>
					<Form.Control
						type="text"
						placeholder="Preview Video"
						value={InfoPreviewVideo}
						onChange={(e) => {
							dispatch(setPreviewVideo(e.target.value));
						}}
					/>
				</Col>
			</Form.Group>

			{/* Navigation */}
			<Col className="mb-3 me-3 fixed-bottom d-flex justify-content-center">
				<Button onClick={() => props.setCurrentTab("addSubtitle")}>
					<AiOutlineArrowRight />
				</Button>
			</Col>
		</>
	);
}
