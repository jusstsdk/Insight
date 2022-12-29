import { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Row, Col, Button, Modal } from "react-bootstrap";

import { addSubtitle, editSubtitleInfo } from "../../../redux/createCourseSlice";
import { MdOutlineError } from "react-icons/md";

export default function AddSubtitleInfo(props) {
	const dispatch = useDispatch();

	// If the component is used for Add, the Title and Hours are default values
	// If the component is used for Edit, the Title, Hours and SubtitleKey is passed as a prop from the selected Subtitle
	const [Title, setTitle] = useState(
		props.case === "Add" ? "" : props.subtitle.title ? props.subtitle.title : ""
	);
	const [Hours, setHours] = useState(
		props.case === "Add" ? 0 : props.subtitle.hours ? props.subtitle.hours : 0
	);
	const SubtitleKey = props.case === "Add" ? -1 : props.subtitleKey;
	const [MissingTitle , setMissingTitle] = useState(false);
	const [MissingHours , setMissingHours] = useState(false);

	const handleAddSubtitle = () => {
		console.log(Hours);
		if(Title === ""){
				setMissingTitle(true);
			} else {
				setMissingTitle(false);
			}
			if(isNaN(Hours) || parseFloat(Hours) <= 0){
				setMissingHours(true);
			} else {
				setMissingHours(false);
			}
			if(Title === "" ||  parseFloat(Hours) <=0 || isNaN(Hours)){
				return;
			}switch (props.case) {
			// If the component is used for Add, it adds the subtitleInfo to the Subtitles array in the reducer
			// If the component is used for Edit, it edits the subtitleInfo of a specific subtitle in the reducer using the index
			

			case "Add": {
				let newSubtitle = {
					title: Title,
					hours: Hours,
					exercises: [],
					videos: [],
				};
				dispatch(addSubtitle(newSubtitle));
				break;
			}
			case "Edit": {
				let newSubtitle = {
					title: Title,
					hours: Hours,
				};
				dispatch(editSubtitleInfo({ key: SubtitleKey, subtitle: newSubtitle }));
				break;
			}
			default:
		}
		setTitle("");
		setHours("");
		props.handleClose();
	};
	return (
		<Modal
			show={props.show}
			onHide={props.handleClose}
			backdrop="static"
			keyboard={false}
			size="xl"
			dialogClassName="modal-90w"
			aria-labelledby="example-custom-modal-styling-title"
			centered>
			<Modal.Header closeButton>
				<Modal.Title id="example-custom-modal-styling-title">Adding a Subtitle</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form.Group
					as={Row}
					className="mb-3 d-flex align-items-center justify-content-start"
					controlId="formHorizontalEmail">
					<Form.Label column sm={2}>
						<span>Subtitle title</span>
						<br />
						<span>{MissingTitle && <span className="error">Missing<MdOutlineError/></span>}</span>
					</Form.Label>
					
					<Col sm={6}>
						<Form.Control
							type="text"
							placeholder="Title"
							value={Title}
							onChange={(e) => {
								setTitle(e.target.value);
							}}
						/>
					</Col>
					<Form.Label id="hours" column sm={1}>
						<span>Hours</span>
					</Form.Label>
					<Col sm={2}>
						<Form.Control
							type="number"
							placeholder="Hours"
							value={Hours}
							onChange={(e) => {
								setHours(parseFloat(e.target.value));
							}}
						/>
						<span>{MissingHours && <span className="error">must be > 0 <MdOutlineError/></span>}</span>
					</Col>
				</Form.Group>
				
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={props.handleClose}>
					Close
				</Button>
				<Button className="me-3" onClick={handleAddSubtitle}>
					Add Subtitle
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
