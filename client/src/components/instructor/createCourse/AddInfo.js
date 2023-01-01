import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Row, Col, Button } from "react-bootstrap";
import { MdOutlineError } from "react-icons/md";
import {
	setTitle,
	setSummary,
	setOriginalPrice,
	setPreviewVideo,
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
	const InfoTitle = useSelector((state) => state.courseInfoReducer.title);
	const InfoSummary = useSelector((state) => state.courseInfoReducer.summary);
	const InfoOriginalPrice = useSelector(
		(state) => state.courseInfoReducer.originalPrice
	);
	const InfoPreviewVideo = useSelector(
		(state) => state.courseInfoReducer.previewVideo
	);
	
	const InfoSubjects = useSelector((state) => state.courseInfoReducer.subjects);
	const SummaryRef = useRef();
	const [MissingTitle, setMissingTitle] = useState(false);
	const [InvalidPrice, setInvalidPrice] = useState(false);
	const [MissingSummary, setMissingSummary] = useState(false);
	const [MissingPreviewVideo, setMissingPreviewVideo] = useState(false);
	const [BadUrl, setBadUrl] = useState(false);
	const [MissingSubjects, setMissingSubjects] = useState(false);

	const resizeTextArea = () => {
		SummaryRef.current.style.height = "auto";
		SummaryRef.current.style.height = SummaryRef.current.scrollHeight + "px";
	};

	const handleNext = async () => {
		if (InfoTitle === "") {
			setMissingTitle(true);
		} else {
			setMissingTitle(false);
		}
		if (InfoOriginalPrice<0){
			setInvalidPrice(true);
		} else {
			setInvalidPrice(false);
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
				videoId = InfoPreviewVideo.split("/")[InfoPreviewVideo.split("/").length - 1];
			}
			let response = await API.get(
				`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=AIzaSyBEiJPdUdU5tpzqmYs7h-RPt6J8VoXeyyY`
			);

			if (response.data.items.length === 0) {
				invalidUrl = true;
				setBadUrl(true);
			} else {
				invalidUrl = false;
				setBadUrl(false);
			}
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
			InfoSubjects.length === 0 || InfoOriginalPrice<0
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

	return (
		<>
			<Col className="d-flex justify-content-center">
				<Col sm={9}>
					<h1 className="fs-3 fw-semibold text-muted">Adding Course Info</h1>
				</Col>
			</Col>
			{/* Title and Price */}
			<Form.Group
				as={Row}
				className="mb-3 d-flex align-items-center justify-content-center"
				controlId="formHorizontalEmail">
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
					{InvalidPrice && <h6 className="error">Invalid Price <MdOutlineError/></h6>}
				</Col>
			</Form.Group>

			{/* Subjects */}
			<Form.Group as={Row} className="mb-3 d-flex align-items-center justify-content-center">
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
			<Form.Group as={Row} className="mb-3 d-flex align-items-center justify-content-center">
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

			{/* Preview Video */}
			<Form.Group as={Row} className="mb-3 d-flex align-items-center justify-content-center">
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
