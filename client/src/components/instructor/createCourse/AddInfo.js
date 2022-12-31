import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Row, Col, Button } from "react-bootstrap";
import { MdOutlineError } from "react-icons/md";
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
import { addNotification } from "../../../redux/notificationsSlice";
import API from "../../../functions/api";

export default function AddInfo(props) {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.userReducer.user);
	const [displayErrors, setDisplayErrors] = useState(false);

	const [AllInstructors, setAllInstructors] = useState([]);
	const instructorId = useSelector((state) => state.userReducer.user._id);
	const InfoTitle = useSelector((state) => state.courseInfoReducer.title);
	const InfoSummary = useSelector((state) => state.courseInfoReducer.summary);
	const InfoOriginalPrice = useSelector(
		(state) => state.courseInfoReducer.originalPrice
	);
	const InfoPreviewVideo = useSelector(
		(state) => state.courseInfoReducer.previewVideo
	);
	const InfoInstructors = useSelector(
		(state) => state.courseInfoReducer.instructors
	).filter((instructor) => {
		return instructor._id !== instructorId;
	});
	const InfoSubjects = useSelector(
		(state) => state.courseInfoReducer.subjects
	);
	const SummaryRef = useRef();
	const [MissingTitle, setMissingTitle] = useState(false);
	const [MissingSummary, setMissingSummary] = useState(false);
	const [MissingPreviewVideo, setMissingPreviewVideo] = useState(false);
	const [BadUrl, setBadUrl] = useState(false);
	const [MissingInstructors, setMissingInstructors] = useState(false);
	const [MissingSubjects, setMissingSubjects] = useState(false);

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
		SummaryRef.current.style.height =
			SummaryRef.current.scrollHeight + "px";
	};

	const handleNext = async () => {
		if (InfoTitle === "") {
			setMissingTitle(true);
		} else {
			setMissingTitle(false);
		}
		if (InfoSummary === "") {
			setMissingSummary(true);
		} else {
			setMissingSummary(false);
		}
		let invalidUrl = false;
		if (InfoPreviewVideo === "") {
			setMissingPreviewVideo(true);
			
			setBadUrl(false);
		} else {
			setMissingPreviewVideo(false);
			let videoId;
			if (InfoPreviewVideo.includes("watch?v=")) {
				videoId = InfoPreviewVideo.split("watch?v=")[1];
			} else {
				videoId =
					InfoPreviewVideo.split("/")[
						InfoPreviewVideo.split("/").length - 1
					];
			}
			console.log(videoId);
			// videoId = videoId[videoId.length - 1].split("watch?v=")[1];
			let response = await API.get(
				`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=AIzaSyBEiJPdUdU5tpzqmYs7h-RPt6J8VoXeyyY`
			);
			console.log(response);

			if (response.data.items.length === 0) {
				invalidUrl = true;
				setBadUrl(true);
				
			} else{
				invalidUrl = false;
				setBadUrl(false);
			} 
		}
		if (InfoInstructors.length === 0) {
			setMissingInstructors(true);
		} else {
			setMissingInstructors(false);
		}
		if (InfoSubjects.length === 0) {
			setMissingSubjects(true);
		} else {
			setMissingSubjects(false);
		}
		if (
			InfoTitle === "" ||
			InfoSummary === "" ||
			InfoPreviewVideo === "" || invalidUrl ||
			InfoInstructors.length === 0 ||
			InfoSubjects.length === 0
		) {
			dispatch(
				addNotification({
					title: "Create Course",
					info: `Please fill in all fields in the Info tab with valid info!`,
					color: "error",
				})
			);
			return;
		} else {
			console.log(InfoTitle);
			props.setCurrentTab("addSubtitle");
		}
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
				controlId="formHorizontalEmail"
			>
				<Form.Label column sm={1}>
					Title{" "}
					{MissingTitle && (
						<span className="error">
							missing
							<MdOutlineError />
						</span>
					)}
				</Form.Label>
				<Col sm={5}>
					<Form.Control
						type="text"
						placeholder="Title"
						value={InfoTitle}
						onChange={(e) => {
							dispatch(setTitle(e.target.value));
						}}
					/>
				</Col>

				<Form.Label className="" column sm={1}>
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

			{/* Subjects */}
			<Form.Group
				as={Row}
				className="mb-3 d-flex align-items-center justify-content-start"
			>
				<Form.Label column sm={1}>
					Subjects{" "}
					{MissingSubjects && (
						<span className="error">
							missing
							<MdOutlineError />
						</span>
					)}
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
			<Form.Group
				as={Row}
				className="mb-3 d-flex align-items-center justify-content-start"
			>
				<Form.Label column sm={1}>
					Summary{" "}
					{MissingSummary && (
						<span className="error">
							missing
							<MdOutlineError />
						</span>
					)}
				</Form.Label>
				<Col sm={8}>
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
			{/* <Form.Group as={Row} className="mb-3 d-flex align-items-center justify-content-start">
				<Form.Label column sm={1}>
					Instructors{" "}
					{MissingInstructors && (
						<span className="error">
							missing
							<MdOutlineError />
						</span>
					)}
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
			</Form.Group> */}

			{/* Preview Video */}
			<Form.Group
				as={Row}
				className="mb-3 d-flex align-items-center justify-content-start"
			>
				<Form.Label column sm={1}>
					Preview Video{" "}
					{MissingPreviewVideo && (
						<span className="error">
							missing
							<MdOutlineError />
						</span>
					)}
					{BadUrl && (
						<span className="error">
							Invalid URL
							<MdOutlineError />
						</span>
					)}
				</Form.Label>
				<Col sm={8}>
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
				<Button onClick={() => handleNext()}>
					<AiOutlineArrowRight />
				</Button>
			</Col>
		</>
	);
}
