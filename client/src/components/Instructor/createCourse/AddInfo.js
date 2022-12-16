import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Row, Col, Button } from "react-bootstrap";

import {
	setTitle,
	setSummary,
	setOriginalPrice,
	setPreviewVideo,
	setInstructors,
} from "../../../redux/infoSlice";

import AddSubject from "./AddSubject";
import DropDownMenu from "../../DropDownMenu";
import { AiOutlineArrowRight } from "react-icons/ai";

export default function AddInfo(props) {
	const dispatch = useDispatch();

	const [AllInstructors, setAllInstructors] = useState([]);

	const instructorId = useSelector((state) => state.userReducer.user._id);
	const InfoTitle = useSelector((state) => state.infoReducer.title);
	const InfoSummary = useSelector((state) => state.infoReducer.summary);
	const InfoOriginalPrice = useSelector((state) => state.infoReducer.originalPrice);
	const InfoPreviewVideo = useSelector((state) => state.infoReducer.previewVideo);
	const InfoInstructors = useSelector((state) => state.infoReducer.instructors);

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
			<h1 className="fs-3 fw-semibold text-muted">Adding Course Info</h1>
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

				<Form.Label column sm={1}>
					Price
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
						value={InfoSummary}
						onChange={(e) => {
							dispatch(setSummary(e.target.value));
						}}
					/>
				</Col>
			</Form.Group>
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
			<AddSubject />
			<Form.Group as={Row} className="mb-3 d-flex align-items-center justify-content-start">
				<Form.Label column sm={1}>
					Instructors
				</Form.Label>
				<Col sm={8}>
					<DropDownMenu
						state={AllInstructors}
						selectedState={InfoInstructors}
						onChange={(selectedList, selectedItem) => {
							dispatch(setInstructors(selectedList));
						}}
						displayValue="email"
						placeholder="Select Course Instructors"
						emptyRecordMsg="You can't add more Instructors."
					/>
				</Col>
			</Form.Group>
			<Col className="nextButton">
				<Button onClick={() => props.setCurrentTab("addExam")}>
					<AiOutlineArrowRight />
				</Button>
			</Col>
		</>
	);
}
